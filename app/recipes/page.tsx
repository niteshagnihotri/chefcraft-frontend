"use client"
import LoadingButtonComponent from "@/components/buttons/loading-button.component";
import RecipesComponent from "@/components/recipes/recipes.component";
import { fetchRecipes } from "@/utils/recipes-api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const RecipesPage = () => {

  const { data: recipes, status, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  return (
  <div>
    {status === "pending" && <LoadingButtonComponent />}
    {error && <h1>No Data</h1>}
    {status === "success" && <RecipesComponent data={recipes}/> 
    }
  </div>
  );
};

export default RecipesPage;
