import React from 'react';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { cn } from '@/lib/utils';

interface SearchSelectComponentProps {
  control: any;
  errors: any;
  label: string;
  isLabelVisible?: boolean;
  name: string;
  placeholder?: string;
  loadOptions: any;
  rules?: any;
  required?: boolean;
  labelClassName?: string;
  className?: string;
  onSelect?: (customer: any) => void;
}

const SearchSelectComponent = ({
  control,
  errors,
  label,
  isLabelVisible = true,
  name,
  placeholder = 'Select an option',
  loadOptions,
  required = false,
  rules = {},
  labelClassName = '',
  className = '',
  onSelect,
}: SearchSelectComponentProps) => {
  return (
    <div>
      <label htmlFor={name} className={cn(`text-sm`, isLabelVisible ? 'block mb-1' : 'hidden', labelClassName)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={null}
        rules={{ required: required, ...rules }}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            cacheOptions
            isClearable
            loadOptions={loadOptions}
            placeholder={placeholder}
            id={name}
            instanceId={name}
            noOptionsMessage={() => 'No Option found'}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: 0,
                background: 'transparent',
                boxShadow: 'none',
              }),
              placeholder: (provided, state) => ({
                ...provided,
                color: '#9CA3AF',
              }),
            }}
            formatOptionLabel={
              onSelect &&
              ((option: any) => (
                <div className="flex flex-col text-sm font-medium">
                  <span className="text-black-600">{option.name}</span>
                  <span className="text-gray-800">{option.email}</span>
                </div>
              ))
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption);

              if (onSelect) {
                onSelect(selectedOption);
              }
            }}
            className={cn('block w-full rounded-md text-sm focus:outline-none border cursor-pointer', className)}
          />
        )}
      />
      {errors[name] && <span className="text-red-500 text-sm">This field is required</span>}
    </div>
  );
};

export default SearchSelectComponent;
