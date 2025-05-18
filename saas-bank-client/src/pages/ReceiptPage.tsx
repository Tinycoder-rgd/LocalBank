// src/pages/ReceiptPage.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";

export default function ReceiptPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(60);

  const {
    account,
    sort,
    ref,
    bankName,
    amount,
    payee = "Test Merchant",
  } = location.state || {};

  // Countdown and PDF generation
  useEffect(() => {
    if (!account || !ref || !amount || !bankName) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const doc = new jsPDF();
      doc.text("Payment Receipt", 20, 20);
      doc.text(`Payee: ${payee}`, 20, 30);
      doc.text(`Amount: £${amount}`, 20, 40);
      doc.text(`Bank: ${bankName}`, 20, 50);
      doc.text(`Account: ${account}`, 20, 60);
      doc.text(`Sort Code: ${sort}`, 20, 70);
      doc.text(`Reference #: ${ref}`, 20, 80);
      doc.save("receipt.pdf");

      // Send to backend
      axios.post("http://localhost:3000/payment/record", {
        account,
        sort,
        ref,
        bank: bankName,
        amount,
        payee,
        status: "success",
      });

      clearInterval(interval);
      // Optionally redirect
      navigate("/");
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [account, sort, ref, bankName, amount, payee, navigate]);

  if (!account || !ref || !amount || !bankName) {
    return (
      <div className="flex items-center justify-center h-screen text-center px-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Missing Transaction Details</h2>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Go Back to Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-6 border rounded-lg bg-white text-center shadow">
        <h2 className="text-xl font-semibold text-green-600">Payment Successful</h2>
        <p className="text-gray-600 mt-2">Your receipt will be downloaded shortly.</p>

        <div className="mt-6 text-sm text-left space-y-2">
          <div><strong>Payee:</strong> {payee}</div>
          <div><strong>Amount:</strong> £{amount}</div>
          <div><strong>Bank:</strong> {bankName}</div>
          <div><strong>Account:</strong> {account}</div>
          <div><strong>Sort Code:</strong> {sort}</div>
          <div><strong>Reference #:</strong> {ref}</div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Receipt will be downloaded in <span className="font-semibold">{secondsLeft}</span> second{secondsLeft !== 1 ? 's' : ''}.
        </p>
      </div>
    </div>
  );
}
