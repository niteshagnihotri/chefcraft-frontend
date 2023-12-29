import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  title: string;
  image: string;
  date_created: Date;
};

const RecipeCardComponent = ({ id, title, image, date_created }: Props) => {
  const date = new Date(date_created);
  const fullDate = date.toDateString();
  const year = fullDate.slice(11, 15);
  const month = fullDate.slice(4, 7);
  const days = date.getDate();
  const router = useRouter();
  return (
    <div
      key={id}
      className="border border-slate-100 rounded-lg shadow-sm space-y-2 sm:min-w-[13rem] max-w-[18rem] cursor-pointer"
      onClick={() => router.push(`/recipes/${id}`)}
    >
      <Image
        src={image ? image : '/assets/gallery.svg'}
        alt=""
        width={500}
        height={300}
        className={(image ? "w-full object-fit  h-[10rem] " : " w-full h-[10rem] object-center " )+" rounded-md rounded-es-none rounded-ee-none border-b bg-red-100 aspect-video"}
      />
      <div className="px-4 pt-2 pb-5 flex items-center justify-between flex-wrap">
        <h1 className="text-xs font-medium sm:text-sm  capitalize flex-none">{title}</h1>
        <div className="inline-flex items-center flex-none text-gray-600 text-xs">
          <BsCalendar2Date className="mr-2" />
          {`${days} `} {`${month} `} {`${year} `}
        </div>
      </div>
    </div>
  );
};

export default RecipeCardComponent;
