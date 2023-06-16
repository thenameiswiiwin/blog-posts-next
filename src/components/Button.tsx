import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonBaseProps = VariantProps<typeof buttonClasses> & {
  children: React.ReactNode;
};

interface ButtonAsAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

type ButtonProps = ButtonBaseProps &
  (ButtonAsAnchorProps | ButtonAsButtonProps);

const buttonClasses = cva(
  'relative inline-flex items-center gap-x-1.5 rounded-md border-2 border-green-600 text-sm font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
  {
    variants: {
      intent: {
        primary:
          'bg-green-600 text-white hover:border-green-500 hover:bg-green-500',
        secondary:
          'bg-white text-green-600 hover:bg-green-100 focus-visible:outline',
        icon: 'border-none bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        tertiary:
          'flex justify-center bg-green-600 leading-6 text-white hover:border-green-500 hover:bg-green-500 disabled:opacity-25 disabled:focus:outline-none',
      },
      size: {
        small: 'px-2 py-1',
        medium: 'w-full px-2 py-1',
        icon: '',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'small',
    },
  }
);

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <span className={clsx('highlight', className)}>{children}</span>;

export const Button = ({ children, intent, size, ...props }: ButtonProps) => {
  const classes = buttonClasses({ intent, size, className: props.className });

  if ('href' in props && props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
