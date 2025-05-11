import Blog from "../models/blogModel";
import { writeFile } from "fs/promises";

const createBlog = async (request) => {
  const formData = await request.formData();
  const timestamp = Date.now();

  //   Handle main blog image
  const image = formData.get("image");
  const imageBytes = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);
  const imagePath = `./public/${timestamp}_${image.name}`;

  await writeFile(imagePath, imageBuffer);
  const imageUrl = `/${timestamp}_${image.name}`;

  //  Hanldle author image
  const authorImg = formData.get("authorImg");
  const authorImgBytes = await authorImg.arrayBuffer();
  const authorImgBuffer = Buffer.from(authorImgBytes);
  const authorImgPath = `./public/${timestamp}_${authorImg.name}`;

  await writeFile(authorImgPath, authorImgBuffer);
  const authorImgUrl = `/${timestamp}_${authorImg.name}`;

  // create blogData
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imageUrl,
    authorImg: authorImgUrl,
  };

  await Blog.create(blogData);
  console.log("Blog Saved");

  return { success: true, msg: "Blog Added" };
};

export default createBlog;
