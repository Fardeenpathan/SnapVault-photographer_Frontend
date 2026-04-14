"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <h1>This is Payment Page</h1>
    </>
  );
}
