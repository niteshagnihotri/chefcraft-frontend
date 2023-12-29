"use client";
import React, { useEffect, useState } from "react";
import TextInputComponent from "../inputs/text-input.component";
import { FormProvider, useForm } from "react-hook-form";
import TextAreaInputComponent from "../inputs/textarea-input.component";
import RecipeIngredient from "./ingredients.recipe";
import RecipeStepsComponent from "./steps.recipe";
import PrimaryBtnComponent from "../buttons/primary-btn.component";
import { createRecipe, updateRecipe } from "@/utils/recipes-api";
import { toast } from "react-toastify";
import { somethingWrong } from "@/utils/errors";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import MultipleImageUpload from "../multiple-image-upload/multipleimage.component";

const RecipeFormComponent = ({ formData }: any) => {
  const formMethods = useForm();
  const {
    register,
    reset,
    setError,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
  } = formMethods;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    let isEditMode = !!formData;
    console.log("clicked data : ", data);
    if (data?.images?.length === 0 || !data?.images) {
      toast.error("Please add Image");
      return;
    }
    if (data?.steps?.length === 0 || !data?.steps) {
      toast.error("Please add steps");
      return;
    }

    let imagesIds = data?.images?.map((image: any) => image._id);
    data["images"] = imagesIds;
    setLoading(true);
    try {
      if (isEditMode) {
        // update new recipe
        const touchedFieldsArray = Object.keys(touchedFields);
        console.log(touchedFieldsArray);
        if (touchedFieldsArray?.length > 0) {
          // Create a new object with excluded fields;
          const postData = touchedFieldsArray.reduce((acc: any, field) => {
            acc[field] = data[field];
            return acc;
          }, {});
          console.log("postData : ", postData);

          const res = await updateRecipe(formData?._id, postData);
          if (res?.data) {
            toast.success("Recipe Updated Successfully");
            router.push("/recipes");

            queryClient.invalidateQueries({ queryKey: ["recipes"] });
          } else {
            toast.error(somethingWrong);
          }
        } else {
          toast.warn("No Field Updated !");
          router.push("/recipes");
        }
      } else {
        // create new recipe

        console.log("post data : ", data);
        let res = await createRecipe(data);
        console.log(res);
        if (res?.status === 200) {
          toast.success("Recipe Created Successfully");
          router.push("/recipes");
        } else {
          toast.error(somethingWrong);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formData) {
      reset({
        title: formData?.title,
        description: formData?.description,
        ingredients: formData?.ingredients,
        images: formData?.images,
        steps: formData?.steps,
      });
    }
  }, [formData]);
  // //
  //   console.log(formData);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-x-16 gap-y-8 xs:px-4 pb-10"
      >
        <div className="grid content-start gap-10">
          <TextInputComponent
            label="Dish Name"
            type="text"
            name="title"
            placeholder="Name"
            required
            register={register}
            errors={errors}
          />

          <TextAreaInputComponent
            label="Description"
            name="description"
            rows={9}
            placeholder="About the Dish"
            required
            register={register}
            errors={errors}
          />

          <RecipeStepsComponent
            name="steps"
            defaultStepsLength={formData?.steps?.length}
          />
        </div>
        <div className="grid gap-10 content-start">
          <div className="flex flex-col space-y-1">
            <label htmlFor="images" className="text-[0.8rem] font-medium">
              Dish Images <span className="text-red-500">*</span>
            </label>
            <MultipleImageUpload
              required
              errors={errors}
              name="images"
              defaultImages={formData?.images ? formData?.images : null}
              setValue={setValue}
              setError={setError}
            />
          </div>

          <RecipeIngredient
            setValue={setValue}
            defaultIngredients={formData?.ingredients}
          />
          <div className="gap-10 flex flex-wrap ml-auto">
            <PrimaryBtnComponent
              onClick={() => reset()}
              type="button"
              text="Reset"
              variant="outline"
              className="rounded-md shadow-sm px-5"
              isDisabled={loading}
            />
            <PrimaryBtnComponent
              type="submit"
              text={formData ? "Update Changes" : "Create Recipe"}
              variant="filled"
              className="rounded-md shadow-sm px-5"
              isDisabled={loading}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RecipeFormComponent;
