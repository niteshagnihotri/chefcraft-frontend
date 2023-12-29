"use client";
import React from "react";
import RecipeFormComponent from "@/components/recipes/recipeform.component";
import { deleteRecipeById, fetchRecipeById } from "@/utils/recipes-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import LoadingButtonComponent from "@/components/buttons/loading-button.component";
import PrimaryBtnComponent from "@/components/buttons/primary-btn.component";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { somethingWrong } from "@/utils/errors";

const EditRecipePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  let recipe_id: string = "";

  if (typeof id === "string") {
    recipe_id = id;
  } else if (Array.isArray(id) && id.length > 0) {
    recipe_id = id[0];
  }

  const {
    data: recipe_detail,
    status,
    error,
  } = useQuery({
    queryKey: ["recipe_detail", id],
    queryFn: () => fetchRecipeById(recipe_id),
    enabled: recipe_id !== "",
  });

  const handleDelete = async (e: any) => {
    let res = confirm("Are you sure you want to delete recipe ? ");
    if (res) {
      try {
        await deleteRecipeById(recipe_detail[0]?._id)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Recipe Deleted Successfully");
              queryClient.invalidateQueries({ queryKey: ['recipes'] });
              router.push("/recipes");
            }
            else{
              toast.error("Recipe Not Deleted")
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(somethingWrong);
          });
      } catch (error) {}
    }
  };

  return (
    <div className="space-y-12 ">
      {status === "pending" && <LoadingButtonComponent />}
      {status === "success" && (
        <>
          <div className="w-full flex items-center flex-col sm:flex-row space-y-10 sm:space-y-0 justify-between">
            <h1 className="font-semibold text-slate-600">
              Edit {recipe_detail[0]?.title} Recipe
            </h1>
            <PrimaryBtnComponent
              onClick={handleDelete}
              type="button"
              variant="outline"
              text={"Delete"}
              icon={<MdDeleteOutline className="text-lg" />}
              className="text-[0.7rem] sm:text-xs ml-auto xs:ml-0"
            />
          </div>

          <div>
            <RecipeFormComponent
              formData={recipe_detail ? recipe_detail[0] : false}
            />
          </div>
        </>
      )}
      {error && <h1>No Data Found. Please Try Again Later</h1>}
    </div>
  );
};

export default EditRecipePage;
