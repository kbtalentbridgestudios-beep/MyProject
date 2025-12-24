// src/pages/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../utils/api";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navState = location.state || {};
  const initialJobId = navState.jobId || searchParams.get("jobId") || null;

  const [jobId] = useState(initialJobId);
  const [job, setJob] = useState(null);
  const [priceINR, setPriceINR] = useState(navState.priceINR ?? null);

  const [candidate, setCandidate] = useState({ name: "", email: "", contact: "" });
  const [loadingJob, setLoadingJob] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const decodeJwtPayload = (tkn) => {
    try {
      if (!tkn) return null;
      const parts = tkn.split(".");
      if (parts.length < 2) return null;
      const payload = parts[1];
      const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(b64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const categoryPrices = { default: 99 };

  const computePriceFromJob = (jobObj) => {
    if (!jobObj) return categoryPrices.default;
    const sources = [jobObj.finalPrice, jobObj.jobPrice, jobObj.categorySnapshot?.fee, jobObj.price];
    for (let s of sources) {
      if (typeof s === "number" && !Number.isNaN(s) && s >= 0) return s;
      if (typeof s === "string" && s.trim() !== "") {
        const n = Number(s);
        if (!Number.isNaN(n) && n >= 0) return n;
      }
    }
    const catName = jobObj?.categorySnapshot?.name || jobObj?.category || jobObj?.categoryName;
    if (catName && typeof categoryPrices[catName] !== "undefined") return categoryPrices[catName];
    return categoryPrices.default;
  };

  const fetchCandidateInfo = async () => {
    if (!token) return;
    const endpoints = ["/api/candidate/me", "/api/candidate/profile"];
    for (const ep of endpoints) {
      try {
        const res = await axios.get(apiUrl(ep), { headers: { Authorization: `Bearer ${token}` } });
        const data = res.data;
        let c = null;
        if (data.candidate) c = data.candidate;
        else if (data.success && (data.candidate || data.data)) c = data.candidate || data.data;
        else if (typeof data === "object" && (data.email || data.contact || data.phone || data.mobile)) c = data;
        if (c) {
          setCandidate({
            name: c.name || c.fullName || "",
            email: c.email || c.emailAddress || "",
            contact: c.contact || c.phone || c.mobile || "",
          });
          return;
        }
      } catch (e) {
        console.warn("fetchCandidateInfo error:", e?.message || e);
      }
    }
    const payload = decodeJwtPayload(token);
    if (payload) {
      const p = payload.user || payload;
      setCandidate({ name: p?.name || "", email: p?.email || "", contact: p?.contact || p?.phone || "" });
    }
  };

  const fetchJob = async (id) => {
    try {
      setLoadingJob(true);
      const res = await axios.get(apiUrl(`/api/admin/jobs/${id}`));
      const jobData = res.data?.job || (Array.isArray(res.data) ? res.data[0] : res.data);
      if (jobData) {
        setJob(jobData);
        if (priceINR === null || priceINR === undefined) setPriceINR(computePriceFromJob(jobData));
      } else setError("Job not found");
    } catch (err) {
      console.warn("fetchJob error:", err?.message || err);
      setError("Error loading job");
    } finally {
      setLoadingJob(false);
    }
  };

  useEffect(() => {
    if (!jobId) {
      setError("Missing job id.");
      return;
    }
    fetchCandidateInfo();
    fetchJob(jobId);
    // eslint-disable-next-line
  }, [jobId]);

  const handleCheckout = async () => {
    if (!token) {
      alert("Please login first as candidate.");
      navigate("/login");
      return;
    }
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions first.");
      return;
    }

    const priceNum = Number(priceINR ?? computePriceFromJob(job));
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError("Invalid amount. Please refresh and try again.");
      return;
    }

    setCreatingOrder(true);
    setError(null);
    try {
      const amountRupees = parseFloat(priceNum.toFixed(2)); // send rupees, backend converts to paise
      console.log("Creating order (rupees):", { jobId, amountRupees });

      const res = await axios.post(
        apiUrl("/api/payments/create-order"),
        {
          amount: amountRupees,
          currency: "INR",
          jobId,
          title: job?.title || "Job Application",
        },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 20000 }
      );

      const data = res.data || {};
      console.log("create-order response:", data);

      const url =
        data.paymentUrl ||
        data.checkoutPageUrl ||
        data.checkout_url ||
        data.redirectUrl ||
        data.payment_url;

      if (url) {
        window.location.href = url;
        return;
      }

      if (data?.merchantOrderId && data?.checkoutPath) {
        window.location.href = data.checkoutPath;
        return;
      }

      if (data?.merchantOrderId && !url) {
        try {
          const poll = await axios.get(apiUrl("/api/payments/get-payment-url"), {
            params: { merchantOrderId: data.merchantOrderId },
            headers: { Authorization: `Bearer ${token}` },
            timeout: 15000,
          });
          const pollUrl = poll?.data?.paymentUrl || poll?.data?.checkoutPageUrl;
          if (pollUrl) {
            window.location.href = pollUrl;
            return;
          }
        } catch (e) {
          console.warn("poll for payment url failed:", e);
        }
      }

      setError("Payment link not found on server.");
    } catch (err) {
      const payload = err?.response?.data ?? err?.message ?? err;
      console.error("create-order error:", payload);
      if (payload?.step === "token") {
        setError("Payment gateway temporarily unavailable (token error).");
      } else if (payload?.step === "pay") {
        setError("Payment gateway rejected the request. Please try later.");
      } else {
        setError(typeof payload === "string" ? payload : JSON.stringify(payload));
      }
    } finally {
      setCreatingOrder(false);
    }
  };

  const displayAmount = job ? computePriceFromJob(job) : categoryPrices.default;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black">
      <div className="max-w-3xl w-full">
        <div className="mb-6 text-white flex items-center justify-between">
          <h1 className="text-2xl font-bold">Complete Payment</h1>
          <button onClick={() => navigate(-1)} className="text-sm px-3 py-1 border rounded bg-gray-800">
            Back
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

        <div className="bg-white rounded-lg p-6 shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">{job?.title || "Job Application"}</h2>
          <p className="text-sm text-gray-600 mb-4">{job?.company}</p>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Registered Contact</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Email</label>
                <input
                  type="email"
                  value={candidate.email || ""}
                  readOnly
                  className="w-full mt-1 p-2 rounded bg-gray-100 text-gray-800"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Mobile</label>
                <input
                  type="tel"
                  value={candidate.contact || ""}
                  readOnly
                  className="w-full mt-1 p-2 rounded bg-gray-100 text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Amount to Pay</div>
              <div className="text-2xl font-bold text-gray-900">₹ {displayAmount}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Job ID</div>
              <div className="text-sm text-gray-700">{jobId}</div>
            </div>
          </div>

          <div className="flex items-center mt-4 mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mr-2 accent-red-600 w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noreferrer" className="text-red-600 underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noreferrer" className="text-red-600 underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* ✅ UPDATED CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            disabled={!acceptedTerms || creatingOrder || loadingJob || !job || !displayAmount}
            aria-disabled={!acceptedTerms || creatingOrder || loadingJob || !job || !displayAmount}
            aria-busy={creatingOrder}
            title={
              !acceptedTerms
                ? "Accept Terms & Conditions to continue"
                : `Pay ₹ ${Number(displayAmount).toFixed(2)}`
            }
            className={`w-full px-6 py-3 rounded font-semibold text-white flex items-center justify-center gap-3 transition ${
              !acceptedTerms || loadingJob || !job || !displayAmount
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {creatingOrder ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Processing payment…</span>
                <span className="sr-only">Processing payment</span>
              </>
            ) : (
              <span>Checkout ₹ {Number(displayAmount).toFixed(2)}</span>
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-400">
          After you complete payment on the gateway page, your application will be recorded automatically.
          For help, contact <strong>kbtalentbridgestudios@gmail.com</strong>.
        </div>
      </div>
    </div>
  );
}
