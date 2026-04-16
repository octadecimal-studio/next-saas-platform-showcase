import { LogoIcon } from './LogoIcon';
import { LogoText } from './LogoText';
import { cn } from '@/lib/utils';

interface LogoSweepProps {
  size?: number;
  className?: string;
  textClassName?: string;
  showText?: boolean;
}

export function LogoSweep({
  size = 28,
  className,
  textClassName,
  showText = true,
}: LogoSweepProps) {
  return (
    <span className={cn('relative inline-flex items-center gap-2 overflow-hidden', className)}>
      <LogoIcon size={size} className="text-foreground" />
      {showText && <LogoText className={textClassName} />}
      <span
        aria-hidden="true"
        className="logo-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
      />
    </span>
  );
}
