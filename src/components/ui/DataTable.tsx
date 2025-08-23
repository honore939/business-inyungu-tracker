import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DataTableProps<T> {
  data: T[];
  columns: {
    id: string;
    header: string;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  onRowClick?: (item: T) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search...',
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  // Function to filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter((item) => {
      // Convert item to string representation for simple searching
      const itemStr = JSON.stringify(item).toLowerCase();
      return itemStr.includes(searchQuery.toLowerCase());
    });
  }, [data, searchQuery]);

  // Function to sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a: any, b: any) => {
      if (a[sortColumn] === b[sortColumn]) return 0;
      
      const comparison = a[sortColumn] < b[sortColumn] ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  return (
    <div className={cn('overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700', className)}>
      {searchable && (
        <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
                >
                  {column.sortable ? (
                    <button
                      className="group inline-flex items-center gap-1"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.header}
                      <span className="ml-1">
                        {sortColumn === column.id ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <div className="h-4 w-4 text-gray-200 opacity-0 group-hover:opacity-100 dark:text-gray-600">
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <tr 
                  key={item.id} 
                  className={cn(
                    'transition-colors hover:bg-gray-50 dark:hover:bg-gray-700',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={`${item.id}-${column.id}`}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white"
                    >
                      {column.cell(item)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;