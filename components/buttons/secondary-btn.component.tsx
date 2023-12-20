import React from 'react';
import { cn } from '@/lib/utils';

interface SecondaryBtnWithIconIP {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: React.ReactNode;
  variant?: 'filled' | 'outline';
  isDisabled?: boolean;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const SecondaryBtn = ({
  text,
  type = 'button',
  onClick,
  variant = 'filled',
  isDisabled = false,
  icon,
  iconPosition = 'left',
  className = '',
}: SecondaryBtnWithIconIP) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'text-xs px-4 py-2 rounded-lg hover:shadow-md inline-flex items-center gap-2',
        variant === 'outline' && 'bg-white text-primary border-2 border-primary',
        variant === 'filled' && 'bg-primary text-white border-2 border-primary',
        iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse',
        className
      )}
      disabled={isDisabled}
    >
      {icon && icon} {text}
    </button>
  );
};

export default SecondaryBtn;
