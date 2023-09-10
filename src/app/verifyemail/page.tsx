"use client";

import axios from "axios";
import { url } from "inspector";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl"> Verify Email</h1>
      <h2 className="text-white bg-slate-600 px-2 py-2">
        {token ? `${token}` : "No token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl text-black">Verified</h2>
          <Link href="/login">Login to continue</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
