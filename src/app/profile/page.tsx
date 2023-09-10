"use client";

import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const route = useRouter();
  const [data, setData] = useState("Nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      route.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl text-orange-400">Profile</h1>
      <h2>
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <Toaster />
      <p className="text-2xl animate-pulse">This is the profile page display</p>

      <button
        onClick={logout}
        className="text-black text-2xl mt-8 border-solid outline rounded border-gray-500 px-4 py-2"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-500 text-black text-2xl mt-8 border-solid outline rounded border-gray-500 px-4 py-2"
      >
        Get user Details
      </button>
    </div>
  );
}
