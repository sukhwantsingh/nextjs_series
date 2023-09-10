"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success: ", response.data);
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <div className=" text-white bg-slate-900 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-3xl text-center">
        {loading ? "Pocessing" : "Login here"}
      </h1>

      <hr />
      <label htmlFor="email">Email id</label>
      <input
        className="text-black p-2 border border-green-400 rounded-lg mb-4 focus:border-green-700"
        type="email"
        id="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email Id"
      />
      <label htmlFor="password">Password</label>
      <input
        className="text-black p-2 border border-green-400 rounded-lg mb-4 focus:border-green-700"
        type="password"
        id="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        onClick={onLogin}
        className="p-2 rounded-lg text-white border-solid outline focus:border-white mt-4"
      >
        {disabled ? "Not allowed" : "Hit Login"}
      </button>

      <p className="text-white mt-8">
        Visit the
        <Link rel="stylesheet" href="/signup">
          <span className="text-purple-500 text-2xl">Signup</span>
        </Link>
      </p>
      <Link className="mt-4" rel="stylesheet" href="/forgotpassword">
        <span className="text-purple-500 text-1xl">Forgot password</span>
      </Link>
    </div>
  );
}
