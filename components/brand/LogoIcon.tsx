import { cn } from '@/lib/utils';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 28, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" fill="currentColor" />
      <rect
        x="16"
        y="16"
        width="12"
        height="12"
        fill="currentColor"
        opacity="0.7"
        transform="rotate(45 22 22)"
      />
    </svg>
  );
}
