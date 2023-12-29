import { fetchIngredients } from "@/utils/ingredients";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

type Props = {
  setValue: any;
  defaultIngredients?: any;
};

const RecipeIngredient = ({ setValue, defaultIngredients }: Props) => {
  const [existingIngredients, setExistingIngredients] = useState<any>([]);

  const handleChange = (e: any) => {
    if(e.target.checked){
      let existIndex = existingIngredients && existingIngredients?.findIndex((ingredient: any)=>ingredient === e.target.value);
      if(existIndex === -1){
        let newIngredients = [...existingIngredients];
        newIngredients.push(e.target.value);
        setExistingIngredients(newIngredients);
        setValue('ingredients', newIngredients, {shouldTouch: true});
      }
      else{        
      let filteredIngredients = existingIngredients && existingIngredients?.filter((ingredient: any)=>ingredient !== e.target.value);
      setExistingIngredients(filteredIngredients);
      setValue('ingredients', filteredIngredients, {shouldTouch: true});
      }
    }
    else{
      let filteredIngredients = existingIngredients && existingIngredients?.filter((ingredient: any)=>ingredient !== e.target.value);
      setExistingIngredients(filteredIngredients);
      setValue('ingredients', filteredIngredients, {shouldTouch: true});
    }
  };

  const {
    data: ingredients,
    status,
    error,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });

  useEffect(() => {
    if (defaultIngredients) {
      let ingredients = defaultIngredients.map((ingredient: any)=>(ingredient?._id));
      setExistingIngredients(ingredients);
    }
  }, [defaultIngredients]);

  return (
    ingredients &&
    status === "success" && (
      <div className="flex flex-col space-y-5 text-xs">
        <h1 className="text-[0.8rem] font-medium">
          Ingredients <span className="text-red-500">*</span>
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 justify-items-stretch">
          {ingredients?.map((ingredient: any, index: number) => {
            let checkFlag = existingIngredients?.includes(ingredient._id);
            return (
              <div key={index} className="flex items-center space-x-2">
                <input
                  checked={checkFlag}
                  type="checkbox"
                  value={ingredient._id}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label htmlFor="" className="capitalize">
                  {ingredient?.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default RecipeIngredient;
