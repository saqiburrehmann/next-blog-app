import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blog);
      console.log("Response Data", response.data.blog);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false); // ✅ done loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading blogs...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("technology")}
          className={
            menu === "technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("startup")}
          className={
            menu === "startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("lifestyle")}
          className={
            menu === "lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => (
            <BlogItem
              key={index}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
