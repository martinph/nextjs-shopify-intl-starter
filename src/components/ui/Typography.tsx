import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import clsx from 'clsx';

type HeadingSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

const sizeClasses: Record<HeadingSize, string> = {
  sm: 'text-sm font-semibold',
  base: 'text-base font-semibold',
  lg: 'text-lg font-semibold',
  xl: 'text-xl font-bold',
  '2xl': 'text-2xl font-bold',
  '3xl': 'text-3xl font-bold',
};

type HeadingProps<T extends ElementType = 'h2'> = {
  as?: T;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function Heading<T extends ElementType = 'h2'>({
  as,
  size = '2xl',
  className,
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as || 'h2';

  return (
    <Component className={clsx(sizeClasses[size], className)} {...props}>
      {children}
    </Component>
  );
}
