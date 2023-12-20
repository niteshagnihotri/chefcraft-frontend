'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Gallery from '@/public/icons/image.svg';
import Cookies from 'js-cookie';
import axios from 'axios';
import SingleImageComponent from './single-image.component';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import LoadingSpinner from '../buttons/loading-spinner.component';
import { useSearchParams } from 'next/navigation';
import LoadingButtonComponent from '../buttons/loading-button.component';
import { deleteImage } from '@/utils/images-api';
import { makeRequest } from '@/lib/make-request';
import { somethingWrong } from '@/utils/errors';

interface Image {
  id?: number;
  product_id?: string;
  directus_files_id: string;
}

interface CustomUploadInputProps {
  name: string;
  placeholderText?: string;
  required?: boolean;
  options?: any;
  className?: string;
  setValue: any;
  defaultImages?: any[];
  errors: any;
  setError?: any;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// type existingImage = {
//   id: number;
//   product_id: string;
// };

const MultipleImageUpload: React.FC<CustomUploadInputProps> = ({
  name,
  setValue,
  className = '',
  defaultImages = [],
  placeholderText,
  setError,
}) => {
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  let totalImagesLength = selectedImages.length + existingImages.length;
  const [loading, setLoading] = useState(false);
  const maxImages = 4;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const multipleInputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id');

  const uploadImages: (imageFiles: File[]) => Promise<void> = async (imageFiles) => {
    setLoading(true);
    const uploadPromises = imageFiles.map(async (file: File, index) => {
      const formData = new FormData();
      formData.append('image', file);
      
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookies.get('access-token')}`,
          },
        });
        return response?.data?.data;
      } catch (error) {
        console.error(`Error uploading file ${index + 1}:`, error);
        return null; 
      }
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      const validImages = uploadedImages.filter((img) => img !== null);
      let images: any = [...existingImages, ...validImages];
      setExistingImages(images);
      setValue(name, images, { shouldTouch: true });
    } catch (error) {
      console.error('Error uploading files:', error);
    }
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileInput = event.target;
    const files = fileInput.files;

    if (files) {
      // Convert the FileList to an array of file object
      const selectedFiles = Array.from(files);
      // Check if the number of selected files exceeds the limit
      if (selectedFiles.length + totalImagesLength > maxImages) {
        fileInput.value = '';
        toast.error(`Maximum ${maxImages} images can be selected`);
        return;
      }

      // Filter out non-image files
      const imageFiles = selectedFiles.filter((file) => file.type.startsWith('image/'));
      uploadImages(imageFiles);
    }
  };

  const removeImage = async (id: string) => {
    let res = confirm("Are you sure you want to delete the image ? This action can't be undone");
    if(res){
      setLoading(true);
      let existingImageIndex = existingImages?.findIndex((image) => image._id === id);
      if (existingImageIndex !== -1) {
        let imageToDelete = existingImages[existingImageIndex];
            try {
              let res = await makeRequest(
                "DELETE",
                `/api/images/delete/${imageToDelete?._id}`
              );
              if (res?.status === 200) {
                console.log("image removed : ", res);
                toast.success("Image Removed");
                const filteredImages = existingImages?.filter((image)=>image._id !== id);
                setExistingImages(filteredImages);
                setValue(name, filteredImages, {shouldTouch: true});
              }
            } catch (error) {
              console.log(error);
              toast.error(somethingWrong);
            }
      } 
      setLoading(false);
    }   
  };

  const removeAllImages = () => {
    let res = confirm("Are you sure you want to delete all images ? This action can't be undone");
    if(res){
      setLoading(true);
      if (existingImages?.length > 0 ) {
        try {
          const deletionPromises = existingImages.map((image) =>
          deleteImage(image._id)
              .then((res: any) => {
                if (res.status === 200) {
                  console.log('deleted:', res);
                  return image._id;
                }
                return null;
              })
              .catch((error) => {
                console.error(`Error deleting image ${image.id}:`, error);
                return null;
              })
          );
        } catch (error) {
          console.error('Error in removeAllImages:', error);
          // Handle errors as needed
        }
      }
      setExistingImages([]);
      setValue(name, [], {shouldTouch: true});
      setLoading(false);
    }    
  };

  useEffect(() => {
    if (defaultImages?.length > 0) {
      setLoading(true);
      setExistingImages(defaultImages);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImages]);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full grid grid-cols-2 gap-10 items-center justify-items-center py-5 min-h-[200px] max-h-fit bg-gray-100 rounded-xl">
        {existingImages?.map((image: any, index) => {
          return (
            <SingleImageComponent
              key={index}
              id={image?._id}
              alt={`Preview ${index}`}
              src={`${image?.data}`}
              removeImage={removeImage}
              className={'w-20'}
            />
          );
        })}
        {totalImagesLength < maxImages && (
          <div
            onClick={() => inputRef.current?.click()}
            className="flex items-center justify-center border-2 cursor-pointer hover:bg-gray-100 border-gray-300 border-dashed w-14 aspect-square bg-light-white"
          >
            <AiOutlinePlus />
            <input
              ref={inputRef}
              onChange={handleFileChange}
              type="file"
              className="hidden"
              multiple
              accept=".jpg, .jpeg, .png"
            />
          </div>
        )}
      </div>
      <input
        ref={multipleInputRef}
        onChange={handleFileChange}
        type="file"
        className="hidden"
        multiple
        name={name}
        accept=".jpg, .jpeg, .png"
      />
      <div className="flex items-center flex-row">
        {loading && <LoadingButtonComponent />}
        {totalImagesLength > 0 && (
          <button
            type="button"
            className="flex items-center px-4 py-1 mt-2 ml-auto text-sm font-medium text-white rounded-full bg-gradient-to-tr from-orange-500 to-orange-700"
            onClick={removeAllImages}
          >
            Clear <MdDelete className="ml-1 text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
