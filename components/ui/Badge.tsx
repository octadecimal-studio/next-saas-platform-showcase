import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'production' | 'beta' | 'coming-soon' | 'deprecated';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-foreground/5 text-foreground border-border',
  production: 'bg-foreground text-background border-foreground',
  beta: 'bg-background text-foreground border-foreground',
  'coming-soon': 'bg-background text-muted border-border',
  deprecated: 'bg-muted/10 text-muted border-muted/30',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
