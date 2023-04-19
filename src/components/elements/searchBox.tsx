import Image from 'next/image';
import React from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="border rounded border-gray-400 bg-white flex pl-3 gap-2 justify-start items-center w-60">
      <Image height="14" src="/icons/icon-search.svg" width="14" />
      <input
        className="bg-white border-0 h-9 w-full outline-none rounded"
        onChange={onChange}
        placeholder="Search"
        type="text"
        value={value}
      />
    </div>
  );
}

export default SearchBox;
