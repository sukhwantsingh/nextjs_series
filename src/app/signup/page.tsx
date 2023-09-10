"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error("Signup failed - " + error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  });

  return (
    <div className="bg-slate-900 flex flex-col items-center justify-center min-h-screen text-white">
      <Toaster />
      <h1 className="text-3xl text-center my-8">
        {loading ? "Processing" : "Signup"}
      </h1>
      <div className="flex flex-col items-start justify-center ">
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className=" text-black p-2 border border-green-400 rounded-lg mb-4 focus:border-green-700"
          type="text"
          id="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email id</label>
        <input
          className="p-2 border text-black border-green-400 rounded-lg mb-4 focus:border-green-700"
          type="email"
          id="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email Id"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border text-black border-green-400 rounded-lg mb-4 focus:border-green-700"
          type="password"
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
      </div>

      <button
        onClick={onSignup}
        className="p-2 border-grey-300 rounded text-white border-solid outline focus:border-white px-3 py-1"
      >
        {btnDisabled ? "No Signup" : "Signup"}
      </button>

      <Link className="mt-5" rel="stylesheet" href="/login">
        <span className="font-bold text-orange-600 animate-pulse border-gray-500 rounded-sm border-solid outline px-4 py-2 ">
          Already have login
        </span>
      </Link>
    </div>
  );
}
