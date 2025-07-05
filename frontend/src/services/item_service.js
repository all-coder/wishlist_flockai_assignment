import { apiGet,apiPost,apiDelete, apiUpdate} from "./util";

export async function createNewItem(name,image,user_id,wishlist_id){
    try{
        const response = apiPost("/item/create",{
            name:name,
            image:image,
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

export async function deleteItem(item_id){
    try{
        const response = apiDelete(`/item/delete/${item_id}`);
        return response;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function updateItem(item_id, name, image) {
  try {
    const response = await apiUpdate(`/item/update/${item_id}`, {
      name: name,
      image: image,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

