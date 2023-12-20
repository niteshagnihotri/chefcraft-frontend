import React from 'react';
import Image from 'next/image';

interface SearchComponentIP {
  placeholderText?: string;
  icon?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchComponent = ({ placeholderText, icon, onChange }: SearchComponentIP) => {
  return (
    <div className="relative rounded-lg mx-5 bg-[#F6F6F6] md:min-w-[200px]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {icon ? icon : <Image src="/search.svg" height={15} width={15} alt={'search icon'} />}
      </div>
      <input
        type={'text'}
        placeholder={placeholderText || 'Search'}
        onChange={onChange}
        className="w-full text-xs bg-[#F6F6F6] border-none rounded-lg h-full py-3 pl-10 text-black focus:outline-none"
      />
    </div>
  );
};

export default SearchComponent;
