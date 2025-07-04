import { apiGet,apiPost } from "./util";

export async function createNewUser(name,email,password){
    try{
        const response = await apiPost(
            "/user/signup",{
                name:name,
                email:email,
                password:password,
            }
        );
        return response;
    }catch(error){
        console.log(error);
        return null
    }
}

export async function loginCurrentUser(email,password){
    try{
        const response = await apiPost("/user/login",{
            email:email,
            password:password,
        });
        return response;
    }catch(error){
        console.log(error);
        return null;
    }
}

export async function loadAllUsers(){
    try{
        const users = await apiGet("/user/all");
        return users;
    }catch(error){
        console.log(error);
        return [];
    }
}

export async function loadUserWishlists(id){
    try{
        const ids = await apiGet(`/user/${id}/wishlists`);
        return ids["wishlist_ids"]
    }catch(error){
        console.log(error);
        return [];
    }
}