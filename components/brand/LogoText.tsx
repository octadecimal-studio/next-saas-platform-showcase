import { cn } from '@/lib/utils';

interface LogoTextProps {
  className?: string;
}

export function LogoText({ className }: LogoTextProps) {
  return (
    <span className={cn('font-mono text-sm tracking-tight', className)}>
      <span className="font-semibold">octadecimal</span>
      <span className="text-muted">.cloud</span>
    </span>
  );
}
