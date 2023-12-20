import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryBtnWithIconIP {
  text: string;
  type: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: 'filled' | 'outline';
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const PrimaryBtnComponent = ({
  text,
  type = 'button',
  icon,
  onClick,
  variant = 'filled',
  isDisabled = false,
  iconPosition = 'left',
  className = '',
}: PrimaryBtnWithIconIP) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'text-xs rounded-full py-2 px-4 inline-flex items-center justify-center gap-2 disabled:bg-opacity-70 hover:shadow-md',
        variant === 'outline' && 'bg-white text-primary border border-primary',
        variant === 'filled' && 'bg-primary text-white border border-primary',
        iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
        className
      )}
      disabled={isDisabled}
    >
      {icon && icon} {text}
    </button>
  );
};

export default PrimaryBtnComponent;
