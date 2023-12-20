import React, { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { makeRequest } from "@/lib/make-request";
import { somethingWrong } from "@/utils/errors";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
interface CustomUploadInputProps {
  label?: string;
  name: string;
  register: any;
  errors: any;
  isDelete?: boolean;
  placeholder?: string;
  required?: boolean;
  options?: any;
  className?: string;
  setDisable?: any;
  isLabelVisible?: boolean;
  setValue: any;
  setError: any;
  defaultImage?: any;
}

const CustomUploadInput: React.FC<CustomUploadInputProps> = ({
  label = "",
  name,
  isDelete = false,
  setDisable = () => {},
  register,
  errors,
  required = false,
  options = {},
  className = "",
  isLabelVisible = true,
  setValue,
  setError,
  defaultImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {getValues} = useFormContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      if (file.type.startsWith("image/")) {
        setError(name, {
          type: "manual",
          message: "",
        });
        setDisable(true);
        displayImage(file);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/images/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get("access-token")}`,
              },
            }
          )
          .then((res) => {
            console.log("value to set ", res?.data?.imageId);
            setDisable(false);
            setValue(name, [res?.data?.imageId], { shouldTouch: true });
            return res?.data?.imageId;
          });
      } else {
        setDisable(false);
        setValue(name, null, { shouldTouch: true });
        setSelectedImage(null);
      }
    }
  };

  const displayImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = async (e: any) => {
    e.stopPropagation();
    setDisable(false);
    setSelectedImage(null);
    if (defaultImage?._id) {
      console.log(defaultImage?._id);
      try {
        let res = await makeRequest(
          "DELETE",
          `/api/images/delete/${defaultImage?._id}`
        );
        if (res?.status === 200) {
          console.log("image removed : ", res);
          toast.error("Image Removed");
        }
      } catch (error) {
        console.log(error);
        toast.error(somethingWrong);
      }
    } 
    let imageId = getValues(name);
    if (imageId[0]) {
      console.log(imageId[0]);
      try {
        let res = await makeRequest(
          "DELETE",
          `/api/images/delete/${imageId[0]}`
        );
        if (res?.status === 200) {
          console.log("image removed : ", res);
          toast.error("Image Removed");
        }
      } catch (error) {
        console.log(error);
        toast.error(somethingWrong);
      }
    }    

    setValue(name, null, { shouldTouch: true });
  };

  return (
    <div className={`${className} space-y-1`}>
      <label
        htmlFor={name}
        className={`font-medium text-[0.8rem] ${isLabelVisible ? "block" : "hidden"}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className="flex min-h-[180px] cursor-pointer items-center justify-center gap-2 rounded-xl mt-0"
        onClick={() => inputRef.current?.click()}
      >
        {selectedImage ? (
          <div className="flex flex-col items-center justify-center w-full h-64 py-4 bg-gray-100 rounded-lg ">
            <div className="relative">
              <Image
                src={selectedImage}
                alt="Selected"
                className="relative rounded-lg h-4/5"
                width={200}
                height={100}
              />
              {isDelete && (
                <span onClick={(e) => removeImage(e)}>
                  <AiOutlineCloseCircle className="absolute text-xl text-white bg-red-500 rounded-full cursor-pointer -right-2 -top-2" />
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-xl">
            <div className={"h-4/5 relative w-fit flex justify-center items-center"}>
              <Image
                src={defaultImage ? defaultImage?.data : "/assets/gallery.svg"}
                className={defaultImage ? " aspect-video  rounded-xl " : " w-[50px] h-[50px] "}
                width={200}
                height={100}
                alt="gallery"
              />
              {isDelete && defaultImage && (
                <span onClick={(e) => removeImage(e)}>
                  <AiOutlineCloseCircle className="absolute text-xl text-white bg-red-500 rounded-full cursor-pointer -right-2 -top-2" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <input
        id={name}
        name={name}
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...options,
        })}
        type="file"
        ref={inputRef}
        onDrop={handleInputChange}
        onChange={handleInputChange}
        className="hidden"
        accept="image/*"
      />

      {name && errors && errors[name] && (
        <p className="mt-0.5 text-xs text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default CustomUploadInput;
