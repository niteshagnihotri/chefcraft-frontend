import React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaInputComponentProps {
  label?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: any;
  register: any;
  errors: any;
  rows?: number;
  disabled?: boolean;
  onChange?: any;
}

const TextAreaInputComponent = ({
  label,
  name,
  placeholder = '',
  required = false,
  className = '',
  labelClassName = '',
  isLabelVisible = true,
  register,
  errors,
  options = {},
  rows = 3,
  disabled = false,
  onChange,
}: TextAreaInputComponentProps) => {
  return (
    <div>
      <label htmlFor={name} className={cn(`text-[0.8rem] font-medium `, isLabelVisible ? 'block mb-1' : 'hidden', labelClassName)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div>
        <textarea
          name={name}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...options,
          })}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            `block w-full rounded-md px-2.5 py-2 text-xs focus:outline-none border border-gray-500, ${className}`
          )}
          rows={rows}
          autoComplete={'off'}
          onChange={onChange}
        />
      </div>
      {errors[name] && <p className="mt-0.5 text-xs text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default TextAreaInputComponent;
