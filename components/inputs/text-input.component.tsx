import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TextInputComponentProps {
  label?: string;
  name: string;
  type: string;
  required?: boolean;
  defaultVal?: string;
  placeholder?: string;
  icon?: string;
  className?: string;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: any;
  register: any;
  errors: any;
  isDisabled?: boolean;
  variant?: 'filled' | 'outline';
  onChange?: any;
  minVal?: number;
  minimize?: boolean;
}

const TextInputComponent = ({
  label,
  name,
  placeholder,
  icon,
  type = 'text',
  required = false,
  defaultVal = '',
  className = '',
  labelClassName = '',
  isLabelVisible = true,
  register,
  errors,
  options = {},
  isDisabled = false,
  variant = 'outline',
  onChange,
  minVal,
  minimize,
}: TextInputComponentProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={minimize ? 'w-max' : 'w-full'}>
      <label htmlFor={name} className={cn(`text-[0.8rem] font-medium `, isLabelVisible ? 'block mb-1' : 'hidden', labelClassName)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute -translate-y-1/2 pointer-events-none right-2 top-1/2">
            <Image src={icon} alt="icon" width={21} height={21} />
          </span>
        )}
        <input
          name={name}
          {...register(name, {
            required: required ? `${label ? label : 'This field '} is required` : false,
            ...options,
          })}
          type={type}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className={cn(
            `w-full rounded-md px-2.5 py-2 text-xs focus:outline-none`,
            variant === 'outline' ? 'border' : 'border border-transparent bg-gray-100',
            className
          )}
          autoComplete={'off'}
          disabled={isDisabled}
          defaultValue={defaultVal}
          onChange={onChange}
          min={minVal}
        />
      </div>
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default TextInputComponent;
