"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassswordPage() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const onForgotPassword = async () => {
    try {
      //   setLoading(true);
      //   const response = await axios.post("/api/users/login", user);
      //   console.log("Login Success: ", response.data);
      //   toast.success("Login Successfully");
      //   router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  return (
    <div className=" text-white bg-slate-900 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-3xl text-center mb-5">
        {loading ? "Pocessing" : "Forgot password page"}
      </h1>

      <hr />
      <label htmlFor="email">Email id</label>
      <input
        className="text-black p-2 border border-green-400 rounded-lg mb-4 focus:border-green-700"
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email Id"
      />

      <button
        onClick={onForgotPassword}
        className="p-2 rounded-lg text-white border-solid outline focus:border-white mt-4"
      >
        {disabled ? "Not allowed" : "Submit"}
      </button>

      <Link className="mt-4" rel="stylesheet" href="/login">
        <span className="text-purple-500 text-1xl">Go back</span>
      </Link>
    </div>
  );
}
