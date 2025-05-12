"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blog);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>

      <div className="relative max-w-[850px] h-[80vh] overflow-auto border border-gray-300 rounded-md shadow-sm">
        <table className="w-full text-sm text-gray-700 table-fixed">
          <thead className="bg-gray-100 sticky top-0 z-10 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left w-1/4">Author</th>
              <th className="px-6 py-3 text-left w-1/3">Title</th>
              <th className="px-6 py-3 text-left w-1/4">Date</th>
              <th className="px-6 py-3 text-left w-1/6">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
