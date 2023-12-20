import { makeRequest } from "@/lib/make-request";

export async function createRecipe(data: any) {
    const res = await makeRequest('POST', `/api/recipes`, data);
    return res;
  }
  
  export async function fetchRecipes() {
    const res = await makeRequest(
      'GET',
      `/api/recipes`
    );
    return res?.data?.recipes;
  }
  
  export async function fetchRecipesByQuery(search: string) {
    const res = await makeRequest(
      'GET',
      `/api/recipes/search?query=${search}`
    );
    return res?.data?.recipes;
  }
  
  export async function updateRecipe(id: string, data: any) {
    const res = await makeRequest('PATCH', `/api/recipes/${id}`, data);
    return res;
  }
  
  export async function fetchRecipeById(id: string) {
    const res = await makeRequest('GET', `/api/recipes/${id}`);
    return res?.data?.recipe;
  }

  export async function deleteRecipeById(id: string) {
    const res = await makeRequest('DELETE', `/api/recipes/${id}`);
    return res;
  }
  