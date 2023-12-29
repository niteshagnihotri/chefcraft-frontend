"use client";
import LoadingButtonComponent from "@/components/buttons/loading-button.component";
import PrimaryBtnComponent from "@/components/buttons/primary-btn.component";
import RecipesComponent from "@/components/recipes/recipes.component";
import { fetchRecipes, fetchRecipesByQuery } from "@/utils/recipes-api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipesPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => clearTimeout(delayTimer); 
  }, [search]);

  const { data: recipes, status, error } = useQuery({
    queryKey: ["recipes", debouncedSearch],
    queryFn: () =>
      debouncedSearch === ""
        ? fetchRecipes()
        : fetchRecipesByQuery(debouncedSearch),
    enabled: true
  });
  
  return (
    <div>
      {error ? (
        <h1>No Data</h1>
      ) : (
        <div className="flex flex-col space-y-16">
          <div className="w-full sm:justify-end space-y-7 sm:space-y-0 sm:ml-auto flex flex-col sm:flex-row items-center space-x-4">
            <input
              type="text"
              name=""
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 py-2 text-xs px-4 w-full sm:w-fit rounded-lg"
              placeholder="Search"
            />
            <PrimaryBtnComponent
              type="button"
              className="w-fit rounded-sm shadow-sm"
              onClick={() => router.push("/recipes/create")}
              text="Add New Recipe"
            />
          </div>

          {status === "pending" && <LoadingButtonComponent />}
          {status === "success" && <RecipesComponent data={recipes} />}
          {status === "success" && recipes?.length === 0 && <h1 className="text-center">No Data Exists</h1>}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
