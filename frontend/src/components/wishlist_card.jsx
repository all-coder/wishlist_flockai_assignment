import { useEffect, useState } from "react";
import { HiUsers, HiClock } from "react-icons/hi";

import { loadAllWishlists } from "../services/wishlist_service";

export default function WishlistCard({ name, description, user_count, whetherJoined, created_at }) {
  return (
    <div className="min-w-full mx-0.5 mt-2 h-24 px-1.5 py-2 border-b border-gray-300 flex items-center">
      <div className="w-3/5 flex flex-col justify-center">
        <h1 className="text-xl font-bold text-black">{name}</h1>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <HiUsers className="w-4 h-4" />
            <span>{user_count} users</span>
          </div>
          <div className="flex items-center gap-1">
            <HiClock className="w-4 h-4" />
            <span>Created on {created_at}</span>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex justify-end">
        {whetherJoined ? (
          <button className="px-4 py-2 bg-black text-white rounded">
            View
          </button>
        ) : (
          <button className="px-4 py-2 bg-black text-white rounded">
            Join
          </button>
        )}
      </div>
    </div>
  );
}