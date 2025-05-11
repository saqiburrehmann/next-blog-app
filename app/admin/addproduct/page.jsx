"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null);
  const [authorImgFile, setAuthorImgFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [authorPreview, setAuthorPreview] = useState(null);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "startup",
    author: "Alex",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image || !authorImgFile) {
      toast.error("Please upload both images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);
    formData.append("authorImg", authorImgFile);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Error from server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // Preview for main image
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // Preview for author image
  useEffect(() => {
    if (!authorImgFile) {
      setAuthorPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(authorImgFile);
    setAuthorPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [authorImgFile]);

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      {/* Upload Main Image */}
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <Image
          src={previewUrl || assets.upload_area}
          width={140}
          height={140}
          alt="Upload Thumbnail"
          className="cursor-pointer object-cover"
        />
      </label>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        id="image"
        hidden
        required
      />

      {/* Upload Author Image */}
      <p className="text-xl mt-4">Upload Author Image</p>
      <label htmlFor="authorImg">
        <Image
          src={authorPreview || assets.upload_area}
          width={140}
          height={140}
          alt="Upload Author"
          className="cursor-pointer object-cover "
        />
      </label>
      <input
        onChange={(e) => setAuthorImgFile(e.target.files[0])}
        type="file"
        id="authorImg"
        hidden
        required
      />

      {/* Title */}
      <p className="text-xl mt-4">Blog Title</p>
      <input
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        type="text"
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        placeholder="type here"
        required
      />

      {/* Description */}
      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="write content here"
        required
      />

      {/* Category */}
      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="startup">Startup</option>
        <option value="technology">Technology</option>
        <option value="lifestyle">Lifestyle</option>
      </select>

      {/* Submit */}
      <br />
      <button
        type="submit"
        className="mt-8 w-40 h-12 bg-black text-white cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105"
      >
        Add
      </button>
    </form>
  );
};

export default Page;
