import { useState } from "react";
import { HiTrash, HiPencil } from "react-icons/hi";
import { deleteItem } from "../services/item_service";
import ItemModal from "./item_modal";
export default function ItemCard({ id, name, image, user_name, email, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState(name);
  const [itemImage, setItemImage] = useState(null); 

  const handleDelete = async () => {
    try {
      await deleteItem(id);
      if (onDelete) onDelete();
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };

  return (
    <>
      <div className="w-40 h-56 bg-white mx-2 my-1 rounded-md shadow-lg overflow-hidden flex flex-col justify-between border border-gray-300">
        <img src={image} alt={name} className="w-full h-3/5 object-cover" />
        <div className="flex-1 px-2 py-2 flex flex-col justify-between">
          <div className="mb-2">
            <span className="text-base font-semibold text-gray-800 truncate">{name}</span>
            <div className="text-xs text-gray-500 leading-tight mt-1">
              <p className="truncate">{user_name}</p>
              <p className="truncate">{email}</p>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md flex items-center justify-center transition"
            >
              <HiPencil size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md flex items-center justify-center transition"
            >
              <HiTrash size={18} />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ItemModal
          itemName={itemName}
          setItemName={setItemName}
          itemImage={itemImage}
          setItemImage={setItemImage}
          onCancel={() => setShowModal(false)}
          isEditing={true}
          item_id={id}
          onSubmit={() => {
            setShowModal(false);
            if (onDelete) onDelete();
          }}
        />
      )}
    </>
  );
}
