// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CheckCircle, XCircle, Loader } from "lucide-react";

// export default function PaymentResult() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const merchantOrderId = params.get("merchantOrderId");

//   const [status, setStatus] = useState("LOADING");
//   const [checking, setChecking] = useState(false);

//   useEffect(() => {
//     if (!merchantOrderId) return;

//     const interval = setInterval(checkStatus, 3000);
//     checkStatus(); // immediate hit

//     return () => clearInterval(interval);
//   }, [merchantOrderId]);

//   async function checkStatus() {
//     try {
//       setChecking(true);

//       const res = await axios.get(
//         `/api/payments/status/${merchantOrderId}`
//       );

//       const s = res.data.status;
//       setStatus(s);

//       if (["SUCCESS", "FAILED"].includes(s)) {
//         // stop polling
//         return;
//       }
//     } catch {
//       setStatus("ERROR");
//     } finally {
//       setChecking(false);
//     }
//   }

//   if (status === "LOADING") {
//     return (
//       <div style={{ color: "white", textAlign: "center", paddingTop: "40px" }}>
//         <Loader size={40} className="animate-spin" />
//         <p>Verifying payment...</p>
//       </div>
//     );
//   }

//   const isSuccess = status === "SUCCESS";
//   const isFailed = status === "FAILED";

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0a0a0a",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "30px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "500px",
//           width: "100%",
//           background: "#111",
//           padding: "40px 30px",
//           borderRadius: "16px",
//           textAlign: "center",
//           border: "1px solid #1f1f1f",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           {isSuccess && <CheckCircle size={80} color="#00ff66" />}
//           {isFailed && <XCircle size={80} color="#ff1a1a" />}
//           {!isSuccess && !isFailed && (
//             <Loader size={60} className="animate-spin" color="#fff" />
//           )}
//         </div>

//         <h1 style={{ color: "#fff", marginTop: "20px" }}>
//           {isSuccess && "Payment Successful"}
//           {isFailed && "Payment Failed"}
//           {!isSuccess && !isFailed && "Payment Processing"}
//         </h1>

//         <p style={{ color: "#ccc", marginTop: "10px" }}>
//           Order ID: {merchantOrderId}
//         </p>

//         {isSuccess && (
//           <button
//             onClick={() => navigate("/dashboard")}
//             style={btnStyle("#00c853")}
//           >
//             Go to Dashboard
//           </button>
//         )}

//         {isFailed && (
//           <button
//             onClick={() => navigate("/payment")}
//             style={btnStyle("#ff1a1a")}
//           >
//             Retry Payment
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// const btnStyle = (bg) => ({
//   marginTop: "25px",
//   padding: "12px 35px",
//   borderRadius: "8px",
//   fontWeight: "700",
//   background: bg,
//   color: "#fff",
//   border: "none",
//   cursor: "pointer",
// });


import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";

export default function PaymentResult() {
  const [params] = useSearchParams();
  const merchantOrderId = params.get("merchantOrderId");

  const [status, setStatus] = useState("loading");
  const [checking, setChecking] = useState(false);

  // AUTO CHECK — first time
  useEffect(() => {
    if (!merchantOrderId) return;
    checkStatus();
  }, [merchantOrderId]);

  // FUNCTION: Fetch payment status
  async function checkStatus() {
    try {
      setChecking(true);

      const res = await axios.get(
        `/api/payments/status/${merchantOrderId}`
      );

      setStatus(res.data.status);
    } catch (err) {
      setStatus("error");
    } finally {
      setChecking(false);
    }
  }

  // LOADING SCREEN
  if (status === "loading") {
    return (
      <div style={{ color: "white", textAlign: "center", paddingTop: "40px" }}>
        <Loader size={40} className="animate-spin" />
        <p>Verifying payment...</p>
      </div>
    );
  }

  const isSuccess = status === "SUCCESS";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "#111",
          padding: "40px 30px",
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid #1f1f1f",
          boxShadow: "0 0 25px rgba(255,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <CheckCircle size={80} color={isSuccess ? "#00ff66" : "#ff1a1a"} />
        </div>

        <h1 style={{ color: "#fff", fontSize: "2.4rem", fontWeight: "700" }}>
          {isSuccess ? "Payment Successful" : "Payment Pending"}
        </h1>

        {isSuccess ? (
          <>
            <p
              style={{
                marginTop: "12px",
                color: "#ccc",
                fontSize: "1.1rem",
              }}
            >
              Thank you! Your application is confirmed.
            </p>

            <div
              style={{
                marginTop: "25px",
                background: "#1a1a1a",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #333",
                color: "#ff4040",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Order ID:{" "}
              <span style={{ color: "#fff" }}>{merchantOrderId}</span>
            </div>
          </>
        ) : (
          <>
            <p style={{ marginTop: "12px", color: "#ccc" }}>
              Your payment is still being processed…
            </p>

            <button
              onClick={checkStatus}
              disabled={checking}
              style={{
                marginTop: "20px",
                padding: "12px 35px",
                borderRadius: "8px",
                fontWeight: "700",
                background: "#ff1a1a",
                color: "#fff",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                opacity: checking ? 0.6 : 1,
              }}
            >
              {checking ? "Checking..." : "Refresh Status"}
            </button>
          </>
        )}

        <a
          href="/"
          style={{
            marginTop: "30px",
            display: "inline-block",
            padding: "12px 35px",
            borderRadius: "8px",
            fontWeight: "700",
            textDecoration: "none",
            background: "#444",
            color: "#fff",
            fontSize: "1rem",
            transition: "0.3s",
          }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { CheckCircle, Loader } from "lucide-react";

// export default function PaymentResult() {
//   const [params] = useSearchParams();
//   const orderId = params.get("merchantOrderId");

//   const [status, setStatus] = useState("loading");
//   const [jobId, setJobId] = useState(null);

//   useEffect(() => {
//     if (!orderId) return;

//     async function checkStatus() {
//       try {
//         const res = await axios.get(`/api/orders/status/${orderId}`);
//         setStatus(res.data.status);
//         setJobId(res.data.jobId || null);
//       } catch (err) {
//         setStatus("error");
//       }
//     }

//     checkStatus();
//   }, [orderId]);

//   if (status === "loading") {
//     return (
//       <div style={{ color: "white", textAlign: "center", paddingTop: "40px" }}>
//         <Loader size={40} className="animate-spin" />
//         <p>Verifying payment...</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0a0a0a",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "30px",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "500px",
//           width: "100%",
//           background: "#111",
//           padding: "40px 30px",
//           borderRadius: "16px",
//           textAlign: "center",
//           border: "1px solid #1f1f1f",
//           boxShadow: "0 0 25px rgba(255,0,0,0.25)",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//           <CheckCircle size={80} color="#ff1a1a" />
//         </div>

//         <h1 style={{ color: "#fff", fontSize: "2.4rem", fontWeight: "700" }}>
//           Payment {status === "SUCCESS" ? "Successful" : "Pending"}
//         </h1>

//         {status === "SUCCESS" ? (
//           <>
//             <p style={{ marginTop: "12px", color: "#ccc", fontSize: "1.1rem" }}>
//               Thank you! Your application is confirmed.
//             </p>

//             <div
//               style={{
//                 marginTop: "25px",
//                 background: "#1a1a1a",
//                 padding: "15px",
//                 borderRadius: "10px",
//                 border: "1px solid #333",
//                 color: "#ff4040",
//                 fontSize: "1rem",
//                 fontWeight: "600",
//               }}
//             >
//               Your Job ID: <span style={{ color: "#fff" }}>{jobId}</span>
//             </div>
//           </>
//         ) : (
//           <p style={{ marginTop: "12px", color: "#ccc" }}>
//             Payment is still being processed…  
//             Refresh after 10 seconds.
//           </p>
//         )}

//         <a
//           href="/"
//           style={{
//             marginTop: "30px",
//             display: "inline-block",
//             padding: "12px 35px",
//             borderRadius: "8px",
//             fontWeight: "700",
//             textDecoration: "none",
//             background: "#ff1a1a",
//             color: "#fff",
//             fontSize: "1rem",
//             transition: "0.3s",
//           }}
//         >
//           Go to Home
//         </a>
//       </div>
//     </div>
//   );
// }
