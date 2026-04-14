"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandle = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login Failed");
    }
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    if(data.user.isSubscribed){
      router.push("/dashboard");
    }else{
      router.push("/payment");
    }

  };

  return (
    <>
      <h1>this is Login Form</h1>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={LoginHandle}
      >
        <div className="flex flex-col gap-2">
          <label className="text-12px" htmlFor="email">
            Email
          </label>
          <input
            className="border rounded-lg px-2 py-1"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-12px" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-lg px-2 py-1"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer py-2 px-10 rounded-lg bg-blue-600 hover:bg-blue-700 mt-2 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
}
