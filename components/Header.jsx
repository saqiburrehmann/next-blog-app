import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");

  const submitHanlder = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warning("Please enter your email to subscribe.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await axios.post("/api/email", formData);

      if (res.data.success) {
        toast.success(res.data.msg);
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try later.");
      console.error("Email subscription error:", error);
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            alt="logo image"
            className="w-[130px] sm:w-auto"
          />
        </Link>
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started <Image src={assets.arrow} alt="Arrow logo" />
        </button>
      </div>

      <div className="text-center my-8 ">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-5 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex, nemo!
        </p>
        <form
          onSubmit={submitHanlder}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-5 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white cursor-pointer"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
