import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import qrImageSrc from "../assets/Qr.jpeg";

export const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const jobId = searchParams.get("jobId");
  const token = localStorage.getItem("token");


  const handlePaymentVerification = async () => {
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://my-backend-knk9.onrender.com/api/payment/verify",
        { jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setPaymentDone(true);
        alert("✅ Payment successful! You can now apply for this job.");
      } else {
        alert("⚠ Payment not yet done or failed.");
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      alert("❌ Payment verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <h1 className="text-2xl font-bold mb-6 text-white">Complete Payment</h1>

      {!paymentDone ? (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center space-y-4 
                        border-4 border-green-500/50 hover:border-green-400
                        animate-pulse"
        >
          <p className="mb-4 text-white">Scan this QR code to pay:</p>

          {/* Static QR image with glow */}
          <img
            src={qrImageSrc}
            alt="Pay Now QR"
            className="mx-auto w-48 h-48 rounded-lg shadow-[0_0_20px_#34D399] transition-shadow duration-500 hover:shadow-[0_0_30px_#34D399]"
          />

          <p className="text-sm text-gray-300 mt-2">Amount: ₹500</p>

          <button
            onClick={handlePaymentVerification}
            disabled={loading}
            className={`mt-4 px-6 py-2 font-semibold rounded-lg transition-colors duration-300
                        ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed text-gray-200"
                            : "bg-red-600 hover:bg-black hover:text-white text-white"
                        }`}
          >
            {loading ? "Verifying..." : "I've Paid, Verify"}
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center border-4 border-green-500/50">
          <h2 className="text-xl font-bold mb-2 text-white">✅ Payment Successful!</h2>
          <p className="text-gray-300">You can now go back and apply for the job.</p>
        </div>
      )}
    </div>
  );
};
