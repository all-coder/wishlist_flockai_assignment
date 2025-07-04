import { apiGet,apiPost } from "./util";

export async function createNewItem(name,image,description,user_id,wishlist_id){
    try{
        const response = apiPost("/item/create",{
            name:name,
            image:image,
            description:description,
            user_id:user_id,
            wishlist_id:wishlist_id
        });
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function loadAllItems(){
    try{
        const items = await apiGet("/item/all");
        return items;
    }catch(error){
        console.log(error);
        return [];
    }
}