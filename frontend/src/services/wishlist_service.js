import { apiGet,apiPost, getFormattedDate } from "./util";

export async function loadAllWishlists() {
  try {
    const wishlists = await apiGet("/wishlist/all");
    return wishlists.map(w => ({
      ...w,
      created_at: getFormattedDate(w.created_at)
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createNewWishlist(name,description){
    try{
        const response = await apiPost("/wishlist/create",{
            name:name,
            description: description,
        });
        return response;
    }catch(error){
        console.log(error);
       return null;
    }
}
export async function addUserToWishlist(user_id, wishlist_id) {
  try {
    const response = await apiPost("/wishlist/add_user", {
      user_id: user_id,
      wishlist_id: wishlist_id,
    });
    return response;
  } catch (error) {
    console.error("Error adding user to wishlist:", error);
    return null;
  }
}
