import { useState, useEffect } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import WishlistCard from "../components/wishlist_card";
import ItemCard from "../components/item_card";
import WishlistModal from "../components/wishlist_modal";
import ItemModal from "../components/item_modal";
import useWishlists from "../hooks/useWishlist";
import { loadAllUsers,loadUserWishlists } from "../services/user_service";
import {
  createNewWishlist,
  loadAllItemsWishlist,
  loadAllWishlists,
} from "../services/wishlist_service";

export default function Home() {
  const [id] = useState(1);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState(null);

  const {
    wishlistName,
    wishlistDescription,
    wishlists,
    setWishlistName,
    setWishlistDescription,
    updateWishlists,
  } = useWishlists(id);

  const handleCreate = async () => {
    try {
      const newWishlist = await createNewWishlist(wishlistName, wishlistDescription);
      updateWishlists(prev => [...prev, newWishlist]);
      setShowModal(false);
      setWishlistName("");
      setWishlistDescription("");
    } catch (error) {
      console.error("Failed to create wishlist:", error);
    }
  };

  const fetchItems = async (wishlistId) => {
    if (!wishlistId) return;
    try {
      const itemsData = await loadAllItemsWishlist(wishlistId);
      setItems(itemsData || []);
    } catch (error) {
      console.error("Failed to load items:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await loadAllUsers();
        setUsers(data || []);
      } catch (err) {
        console.error("Failed to load users:", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedWishlist) {
      fetchItems(selectedWishlist.id);
    } else {
      setItems([]);
    }
  }, [selectedWishlist]);

  return (
    <div className="h-screen w-full bg-gray-100 flex items-center px-6 relative">
      {showModal && (
        <WishlistModal
          wishlistName={wishlistName}
          setWishlistName={setWishlistName}
          wishlistDescription={wishlistDescription}
          setWishlistDescription={setWishlistDescription}
          onSubmit={handleCreate}
          onCancel={() => setShowModal(false)}
        />
      )}

      {showItemModal && selectedWishlist && (
        <ItemModal
          itemName={itemName}
          setItemName={setItemName}
          itemImage={itemImage}
          setItemImage={setItemImage}
          onCancel={() => {
            setShowItemModal(false);
            fetchItems(selectedWishlist.id);
          }}
          user_id={id}
          wishlist_id={selectedWishlist.id}
        />
      )}

      <div className="flex-1 h-[92vh] bg-white rounded-2xl shadow-2xl p-6 mr-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-200 flex items-center gap-3">
          {selectedWishlist && (
            <button
              onClick={() => setSelectedWishlist(null)}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <RiArrowLeftLine className="w-6 h-6" />
            </button>
          )}
          {selectedWishlist ? selectedWishlist.name : "Wishlist"}
        </h1>

        {!selectedWishlist ? (
          wishlists.map((w) => (
            <WishlistCard
              key={w.id}
              {...w}
              user_id={id}
              onView={() => setSelectedWishlist(w)}
              refreshWishlists={async () => {
                const all = await loadAllWishlists();
                const userJoined = await loadUserWishlists(id);
                if (all && userJoined) {
                  const updated = all.map(wl => ({
                    ...wl,
                    whetherJoined: userJoined.includes(wl.id)
                  }));
                  updateWishlists(updated);
                }
              }}
            />
          ))

        ) : (
          <div className="space-y-4 flex flex-row flex-wrap gap-4">
            {items.map((item) => {
              const user = users.find((u) => u.id === item.user_id);
              const user_name = user ? user.name : "Unknown";
              return (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  user_name={user_name}
                  email={user?.email}
                  onDelete={() => fetchItems(selectedWishlist.id)}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="w-80 h-[92vh] bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-start space-y-4">
        <div className="mb-5">
          <p className="text-lg font-semibold text-gray-700">John Doe</p>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition"
        >
          Create New Wishlist
        </button>
        <button
          onClick={() => {
            if (selectedWishlist) setShowItemModal(true);
            else alert("Please select a wishlist first.");
          }}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
        >
          Create New Item
        </button>
      </div>
    </div>
  );
}
