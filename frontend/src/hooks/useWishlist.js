import { useEffect, useState } from "react";
import { loadAllWishlists } from "../services/wishlist_service";
import { loadUserWishlists } from "../services/user_service";

export default function useWishlists(userId) {
  const [wishlistName, setWishlistName] = useState("");
  const [wishlistDescription, setWishlistDescription] = useState("");
  const [wishlists, updateWishlists] = useState([]);

  useEffect(() => {
    async function fetch() {
      const all = await loadAllWishlists();
      const userJoined = await loadUserWishlists(userId);

      if (all && userJoined) {
        const updated = all.map(w => ({
          ...w,
          whetherJoined: userJoined.includes(w.id)
        }));
        updateWishlists(updated);
      }
    }

    fetch();
  }, [userId]);

  return {
    wishlistName,
    setWishlistName,
    wishlistDescription,
    setWishlistDescription,
    wishlists,
    updateWishlists
  };
}
