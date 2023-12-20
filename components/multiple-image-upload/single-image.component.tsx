import Image from 'next/image';
import React, { useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type Props = {
  id: string;
  src: string;
  alt: string;
  removeImage: (id: string) => void;
  className?: string;
};

const SingleImageComponent = ({ src, id, alt, removeImage, className }: Props) => {
  return (
    <div className="relative w-fit h-fit">
      <Image src={src} alt={alt} width={50} height={50} className={`aspect-square  rounded-lg ${className}`} />
      <span onClick={() => removeImage(id)}>
        <AiOutlineCloseCircle className="text-xl absolute -right-2 -top-2 cursor-pointer rounded-full bg-red-500 text-white" />
      </span>
    </div>
  );
};

export default SingleImageComponent;
