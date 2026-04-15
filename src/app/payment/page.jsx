"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function PaymentPage() {
  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("user not found. Please login again");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          country: "IN",
        }),
      },
    );

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: data.subscriptionId,
      name: "My app",
      description: "Monthly Plan",

      handler: function () {
        window.location.href = "/dashboard";
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log(window.Razorpay);
  };

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      ;
      <div className="flex flex-col justify-center items-center mt-12 gap-12">
        <h1>This is Payment Page</h1>
        <button
          onClick={handlePayment}
          className="text-white border px-4 py-2 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-800"
        >
          Subscribe Pay
        </button>
      </div>
    </>
  );
}
