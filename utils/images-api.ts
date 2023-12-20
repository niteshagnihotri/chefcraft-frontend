import { makeRequest } from "@/lib/make-request";



export async function deleteImage(id:string | number) {
    try{
        const res = await makeRequest("DELETE", `/api/images/delete/${id}`);
        return res;
    }
    catch(error){
        console.log(error);
        return error;
    }
}