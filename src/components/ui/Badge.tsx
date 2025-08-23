import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className,
}) => {
  return (
    <span
      className={cn(
        'badge',
        `badge-${variant}`,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;