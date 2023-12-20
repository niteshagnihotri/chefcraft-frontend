import React from 'react';
import { useController } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface SelectInputComponentProps {
  label?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  isLabelVisible?: boolean;
  options?: any;
  control: any;
  errors: any;
  selectOptions: {
    value: string | number;
    label: string;
  }[];
  // defaultValue?: {
  //   value: string | number;
  //   label: string;
  // };
  defaultValue?: string;
}

const SelectInputComponent = ({
  label,
  name,
  control,
  errors,
  required = false,
  options = {},
  className = '',
  labelClassName = '',
  selectOptions,
  placeholder = '',
  isLabelVisible = true,
  defaultValue,
}: SelectInputComponentProps) => {
  // todo: defaultValue is not working
  const { field } = useController({
    control,
    name,
    defaultValue,
    rules: {
      required: required ? `${label} is required` : false,
      ...options,
    },
  });

  return (
    <>
      <div>
        {label && (
          <label htmlFor={name} className={cn(`text-sm`, isLabelVisible ? 'mb-1 block' : 'hidden', labelClassName)}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div>
          <select
            // @ts-ignore
            {...field}
            defaultValue={defaultValue}
            className={cn(`block w-full cursor-pointer rounded-md text-sm p-2 border focus:outline-none`, className)}
          >
            <option value="">{placeholder}</option>
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors[name] && <p className="mt-0.5 text-sm text-red-500">{errors[name].message}</p>}
      </div>
    </>
  );
};

export default SelectInputComponent;
