import React from 'react';
import LoadingSpinner from '@/components/buttons/loading-spinner.component';

interface LoadingButtonComponentIP {
  children?: React.ReactNode;
  text?: string;
}

const LoadingButtonComponent = ({ children, text }: LoadingButtonComponentIP) => {
  return (
    <button
      disabled={true}
      type="button"
      className="py-2.5 w-full print:hidden px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded focus:outline-none inline-flex items-center justify-center"
    >
      {children ? children : <LoadingSpinner />}
      {text ? text : 'Loading...'}
    </button>
  );
};

export default LoadingButtonComponent;
