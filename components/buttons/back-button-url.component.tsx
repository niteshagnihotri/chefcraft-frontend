'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
  url: string;
};

const BackButtonUrlComponent = ({ url }: Props) => {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push(url)} className="bg-gray-100 rounded-lg px-4 py-3 cursor-pointer">
      <Image src={'/arrow-left.svg'} alt={'back arrow'} width={20} height={20} className="cursor-pointer" />
    </button>
  );
};

export default BackButtonUrlComponent;
