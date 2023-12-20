import { makeRequest } from "@/lib/make-request";


export async function fetchIngredients() {
    const res = await makeRequest('GET', `/api/ingredients`);
    return res?.data?.ingredients;
  }
  