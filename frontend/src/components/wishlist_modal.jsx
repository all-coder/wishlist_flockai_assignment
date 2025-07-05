export default function WishlistModal({ wishlistName, setWishlistName, wishlistDescription, setWishlistDescription, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-start justify-center pt-10 z-50 overflow-auto bg-black/50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-300 shadow-xl rounded-2xl p-6 w-full max-w-md mt-10 mb-10 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create Wishlist</h2>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Wishlist Name</label>
          <input value={wishlistName} onChange={(e) => setWishlistName(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">Description</label>
          <textarea value={wishlistDescription} onChange={(e) => setWishlistDescription(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 text-sm resize-none" rows={3} />
        </div>
        <div className="flex justify-center">
          <button onClick={onSubmit} className="rounded-lg bg-black hover:bg-gray-800 px-6 py-2 text-white font-medium transition">Submit</button>
        </div>
        <div className="text-center">
          <button onClick={onCancel} className="text-sm text-gray-500 hover:underline">Cancel</button>
        </div>
      </div>
    </div>
  );
}
