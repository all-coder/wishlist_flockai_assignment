import { HiX } from "react-icons/hi";
import { createNewItem, updateItem } from "../services/item_service";

export default function ItemModal({
  itemName,
  setItemName,
  itemImage,
  setItemImage,
  user_id,
  wishlist_id,
  onCancel,
  isEditing = false,
  item_id,
  onSubmit,
}) {
  const handleSubmit = async () => {
    if (!itemName) return;
    const localPath = "./image.jpg";

    if (isEditing && item_id) {
      await updateItem(item_id, itemName, localPath);
    } else {
      await createNewItem(itemName, localPath, user_id, wishlist_id);
    }

    setItemName("");
    setItemImage(null);
    onCancel();
    if (onSubmit) onSubmit();
  };

  const removeImage = () => {
    setItemImage(null);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-10 z-50 overflow-auto bg-black/50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-md mt-10 mb-10 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isEditing ? "Edit Item" : "Create Item"}
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Item Name</label>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Upload Image</label>

          <label className="inline-block px-4 py-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-800 transition text-sm">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setItemImage(e.target.files[0])}
              className="hidden"
            />
          </label>

          {itemImage && (
            <div className="flex items-center justify-between bg-gray-200 px-3 py-2 rounded-md mt-1">
              <span className="text-sm text-gray-800 truncate max-w-[200px]">{itemImage.name}</span>
              <button onClick={removeImage} className="text-gray-600 hover:text-red-600 transition">
                <HiX size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-black hover:bg-gray-800 px-6 py-2 text-white font-medium transition"
          >
            Submit
          </button>
        </div>

        <div className="text-center">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
