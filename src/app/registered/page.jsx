"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisteredPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState(" ");
  const [error, setError] = useState("");

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log("username", username);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmpassword);

    if (password !== confirmpassword) {
      return setError("Passwords do not match");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration Failed");
    }

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }

    if (data.user?.isSubscribed) {
      router.push("/dashboard");
    } else {
      router.push("/payment");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6 mt-6">
          <h1 className="text-3xl">Registered</h1>
        </div>
        <form
          onSubmit={submitHandle}
          className="flex gap-4 flex-col border px-4 py-4 rounded-lg"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username">User Name</label>
            <input
              className="border px-2 py-1 rounded-lg"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className="border px-2 py-1 rounded-lg"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              className="border px-2 py-1 rounded-lg"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              className="border px-2 py-1 rounded-lg"
              type="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              value={confirmpassword}
            />
          </div>

          <p className="text-sm text-red-500">{error}</p>
          <button
            type="submit"
            className="cursor-pointer py-2 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 mt-4 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
