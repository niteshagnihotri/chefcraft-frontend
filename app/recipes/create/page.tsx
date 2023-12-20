import RecipeFormComponent from "@/components/recipes/recipeform.component";
import React from "react";

const CreateRecipe = () => {
  return (
  <div className="space-y-12">
    <h1 className="font-semibold text-slate-600">Create Recipe</h1>
    <div>
        <RecipeFormComponent />
    </div>
  </div>
  );
};

export default CreateRecipe;
