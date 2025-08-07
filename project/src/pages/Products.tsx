import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { products as initialProducts } from '../data/mockData';
import { productSchema, ProductFormData } from '../utils/validation';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: data.izina,
              category: data.icyiciro,
              sku: data.kode,
              buyPrice: data.igiciroKugura,
              sellPrice: data.igiciroKugurisha,
              quantity: data.umubare,
              description: data.ibisobanuro || '',
              supplier: data.uwatanga
            }
          : p
      ));
      toast.success('Icyicuruzwa cyavuguruwe neza!');
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        id: (products.length + 1).toString(),
        name: data.izina,
        category: data.icyiciro,
        sku: data.kode,
        buyPrice: data.igiciroKugura,
        sellPrice: data.igiciroKugurisha,
        quantity: data.umubare,
        description: data.ibisobanuro || '',
        supplier: data.uwatanga,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'Irahari'
      };
      setProducts([...products, newProduct]);
      toast.success('Icyicuruzwa cyongewe neza!');
    }
    
    reset();
    setShowAddForm(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setValue('izina', product.name);
    setValue('icyiciro', product.category);
    setValue('kode', product.sku);
    setValue('igiciroKugura', product.buyPrice);
    setValue('igiciroKugurisha', product.sellPrice);
    setValue('umubare', product.quantity);
    setValue('ibisobanuro', product.description);
    setValue('uwatanga', product.supplier);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Uremeza ko ushaka gusiba iki cyicuruzwa?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Icyicuruzwa cyasibwe neza!');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Ibicuruzwa</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ongeraho icyicuruzwa
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Shakisha ibicuruzwa..."
          className="input pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Kode:</span> {product.sku}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Icyiciro:</span> {product.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Igiciro cyo kugura:</span> {product.buyPrice} RWF
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Igiciro cyo kugurisha:</span> {product.sellPrice} RWF
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Umubare:</span> {product.quantity}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Inyungu:</span> {product.sellPrice - product.buyPrice} RWF
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
          <div className="w-full max-w-lg sm:max-w-2xl rounded-lg bg-white p-4 sm:p-6 shadow-xl dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-semibold">
              {editingProduct ? 'Hindura icyicuruzwa' : 'Ongeraho icyicuruzwa gishya'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Izina ry'icyicuruzwa
                  </label>
                  <input
                    type="text"
                    {...register('izina')}
                    className={`input mt-1 ${errors.izina ? 'border-red-500' : ''}`}
                    placeholder="Injiza izina ry'icyicuruzwa"
                  />
                  {errors.izina && (
                    <p className="mt-1 text-sm text-red-600">{errors.izina.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Icyiciro
                  </label>
                  <input
                    type="text"
                    {...register('icyiciro')}
                    className={`input mt-1 ${errors.icyiciro ? 'border-red-500' : ''}`}
                    placeholder="Injiza icyiciro cy'icyicuruzwa"
                  />
                  {errors.icyiciro && (
                    <p className="mt-1 text-sm text-red-600">{errors.icyiciro.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kode
                  </label>
                  <input
                    type="text"
                    {...register('kode')}
                    className={`input mt-1 ${errors.kode ? 'border-red-500' : ''}`}
                    placeholder="Injiza kode y'icyicuruzwa"
                  />
                  {errors.kode && (
                    <p className="mt-1 text-sm text-red-600">{errors.kode.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uwatanga
                  </label>
                  <input
                    type="text"
                    {...register('uwatanga')}
                    className={`input mt-1 ${errors.uwatanga ? 'border-red-500' : ''}`}
                    placeholder="Injiza izina ry'uwatanga"
                  />
                  {errors.uwatanga && (
                    <p className="mt-1 text-sm text-red-600">{errors.uwatanga.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Igiciro cyo kugura
                  </label>
                  <input
                    type="number"
                    {...register('igiciroKugura', { valueAsNumber: true })}
                    className={`input mt-1 ${errors.igiciroKugura ? 'border-red-500' : ''}`}
                    placeholder="0"
                  />
                  {errors.igiciroKugura && (
                    <p className="mt-1 text-sm text-red-600">{errors.igiciroKugura.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Igiciro cyo kugurisha
                  </label>
                  <input
                    type="number"
                    {...register('igiciroKugurisha', { valueAsNumber: true })}
                    className={`input mt-1 ${errors.igiciroKugurisha ? 'border-red-500' : ''}`}
                    placeholder="0"
                  />
                  {errors.igiciroKugurisha && (
                    <p className="mt-1 text-sm text-red-600">{errors.igiciroKugurisha.message}</p>
                  )}
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Umubare
                  </label>
                  <input
                    type="number"
                    {...register('umubare', { valueAsNumber: true })}
                    className={`input mt-1 ${errors.umubare ? 'border-red-500' : ''}`}
                    placeholder="0"
                  />
                  {errors.umubare && (
                    <p className="mt-1 text-sm text-red-600">{errors.umubare.message}</p>
                  )}
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ibisobanuro
                </label>
                <textarea
                  {...register('ibisobanuro')}
                  className={`input mt-1 ${errors.ibisobanuro ? 'border-red-500' : ''}`}
                  rows={3}
                  placeholder="Andika ibisobanuro by'icyicuruzwa"
                />
                {errors.ibisobanuro && (
                  <p className="mt-1 text-sm text-red-600">{errors.ibisobanuro.message}</p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                    reset();
                  }}
                >
                  Hagarika
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {editingProduct ? 'Koresha icyicuruzwa' : 'Ongeraho icyicuruzwa'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;