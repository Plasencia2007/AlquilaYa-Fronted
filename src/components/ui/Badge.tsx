import * as React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'surface' | 'glass';
}

function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary-container text-on-secondary-container',
    outline: 'border border-outline-variant/30 text-on-surface-variant',
    surface: 'bg-surface-container-high text-on-surface-variant',
    glass: 'bg-white/20 text-white border border-white/30 backdrop-blur-md',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-md transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
