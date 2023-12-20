import React from "react";
import PrimaryBtnComponent from "../buttons/primary-btn.component";
import RecipeCardComponent from "./recipe.card";
import { useRouter } from "next/navigation";

const RecipesComponent = ({ data }: any) => {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-10">
      <PrimaryBtnComponent
        type="button"
        className="w-fit ml-auto rounded-sm shadow-sm"
        onClick={() => router.push("/recipes/create")}
        text="Add New Recipe"
      />
      {data && (
        <div className="grid grid-cols-3 justify-items-stretch gap-16">
          {data &&
            data.map((recipe: any) => {
              let imageUrl = recipe?.images[0]?.data;
              return (
                <RecipeCardComponent
                  key={recipe._id}
                  id={recipe._id}
                  title={recipe?.title}
                  image={imageUrl}
                  date_created={recipe?.date_created}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default RecipesComponent;
