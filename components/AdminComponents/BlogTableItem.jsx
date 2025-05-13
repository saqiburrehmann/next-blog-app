import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify"; // Import toast for notifications

const BlogTableItem = ({
  id,
  authorImg,
  title,
  author,
  date = "13 May 2025",
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/blog/${id}`);
      // Successfully deleted
      if (onDelete) onDelete(id); // Inform parent if needed
      // toast.success("Blog deleted successfully!"); // Show success toast
    } catch (err) {
      console.error("Failed to delete:", err);
      toast.error("Failed to delete blog."); // Show error toast
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Image
            src={authorImg || assets.profile_icon}
            alt="Author"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-gray-900 font-medium">
            {author || "No Author"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">{title || "Untitled Blog"}</td>
      <td className="px-6 py-4">{date ? formatDate(date) : "No Date"}</td>
      <td className="px-6 py-4">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
