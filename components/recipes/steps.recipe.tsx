import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import TextInputComponent from "../inputs/text-input.component";
import { AiFillPlusCircle } from "react-icons/ai";

const RecipeStepsComponent = ({
  name,
  defaultStepsLength,
}: {
  name: string;
  defaultStepsLength: number;
}) => {
  const [count, setCount] = useState(0);
  const {
    register,
    setValue,
    watch,
    unregister,
    formState: { errors },
  } = useFormContext();

  let handleAddFeature = () => {
    setCount((prevCount) => prevCount + 1);
  };

  let handleRemove = (index: number) => {
    const currentPoints = watch(name) || [];

    const filteredSteps = currentPoints.filter(
      (_: any, i: number) => i !== index
    );
    setValue(name, filteredSteps, {shouldTouch: true});
    unregister(`steps[${index}]`);
    setCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    if (defaultStepsLength) {
      setCount(defaultStepsLength);
    }
  }, [defaultStepsLength]);

  return (
    <div className="space-y-4 pb-10">
      <h1 className="text-[0.8rem] font-medium">Steps to Follow</h1>
      <div className="grid grid-cols-1 gap-8">
        {count > 0 &&
          Array.from({ length: count }).map((_, index) => (
            <div key={index} className="relative">
              <MdDeleteOutline
                onClick={() => handleRemove(index)}
                className={
                  "absolute right-0 text-xl cursor-pointer text-red-400"
                }
              />
              <TextInputComponent
                key={index}
                type="text"
                register={register}
                required
                name={`${name}[${index}]`}
                errors={errors}
                label={`Step ${index + 1}`}
              />
            </div>
          ))}
      </div>
      <h1
        onClick={handleAddFeature}
        className="text-brand-green flex items-center cursor-pointer text-[0.8rem]"
      >
        <AiFillPlusCircle className="mr-1 text-sm" /> Add Steps{" "}
      </h1>
    </div>
  );
};

export default RecipeStepsComponent;
