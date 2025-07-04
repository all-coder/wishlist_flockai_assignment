import { useState, useEffect } from "react";
import WishlistCard from "../components/wishlist_card";
import { loadAllWishlists, createNewWishlist } from "../services/wishlist_service";
import { loadUserWishlists } from "../services/user_service";

export default function Home() {
  const [id, setUserId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [wishlistName, setWishlistName] = useState("");
  const [wishlistDescription, setWishlistDescription] = useState("");
  const [wishlists, updateWishlists] = useState([]);

  useEffect(() => {
    async function fetchWishlists() {
      const response = await loadAllWishlists();
      const ids = await loadUserWishlists(id);

      if (response && ids) {
        const updated = response.map(w => ({
          ...w,
          whetherJoined: ids.includes(w.id)
        }));
        updateWishlists(updated);
      }
    }

    fetchWishlists();
  }, [id]);

  const handleCreate = async () => {
    try {
      const newWishlist = await createNewWishlist(wishlistName, wishlistDescription);
      console.log("Created wishlist:", newWishlist);

      updateWishlists(prev => [...prev, newWishlist]);

      setShowModal(false);
      setWishlistName("");
      setWishlistDescription("");
    } catch (error) {
      console.error("Failed to create wishlist:", error);
    }
  };


  return (
    <div className="h-screen w-full bg-gray-100 flex items-center px-6 relative">
      {showModal && (
        <div className="fixed inset-0 flex items-start justify-center pt-10 z-50 overflow-auto bg-black/50">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-md mt-10 mb-10 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-900">Create Wishlist</h2>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-800 mb-2 block">Wishlist Name</label>
              <input
                type="text"
                value={wishlistName}
                onChange={(e) => setWishlistName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-800 mb-2 block">Description</label>
              <textarea
                value={wishlistDescription}
                onChange={(e) => setWishlistDescription(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 text-sm resize-none"
                rows={3}
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleCreate}
                className="rounded-lg bg-black hover:bg-gray-800 px-6 py-2 text-white font-medium transition"
              >
                Submit
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 h-[92vh] bg-white rounded-2xl shadow-2xl p-6 mr-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200">
          Wishlist
        </h1>
        {
          wishlists.map((w) => (
            <WishlistCard
              key={w.id}
              name={w.name}
              description={w.description}
              user_count={w.user_count}
              created_at={w.created_at}
              whetherJoined={w.whetherJoined}
            />
          ))
        }
      </div>

      <div className="w-80 h-[92vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-start space-y-4">
        <div className="mb-5 ">
          <p className="text-lg font-semibold text-gray-700">John Doe</p>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>

        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition"
          onClick={() => setShowModal(true)}
        >
          Create New Wishlist
        </button>
        <button
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
        >
          Add New Item
        </button>
      </div>
    </div>
  );
}