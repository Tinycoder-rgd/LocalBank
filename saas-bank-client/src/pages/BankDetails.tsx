import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const bankThemes: Record<string, { color: string; icon: string }> = {
  "KCB": { color: "#1C7B4D", icon: "/kcb.png" },
  "Equity": { color: "#7A1E48", icon: "/equity.png" },
  "Cooperative Bank": { color: "green", icon: "/coop.png" },
};

export default function BankDetails() {
  const { bankName } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ account: "", sort: "", ref: "" });

  const bank = bankThemes[bankName || ""] || { color: "#000", icon: "" };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border-t-8" style={{ borderTopColor: bank.color }}>
        <div className="flex items-center gap-4 mb-4">
          <img src={bank.icon} alt={bankName} className="w-10 h-10" />
          <h2 className="text-xl font-semibold">{bankName}</h2>
        </div>

        <input
          type="text"
          placeholder="Account Number"
          className="w-full mb-3 p-2 border rounded"
          onChange={e => setForm({ ...form, account: e.target.value })}
        />
        <input
          type="text"
          placeholder="Sort Code"
          className="w-full mb-3 p-2 border rounded"
          onChange={e => setForm({ ...form, sort: e.target.value })}
        />
        <input
          type="text"
          placeholder="Reference #"
          className="w-full mb-3 p-2 border rounded"
          onChange={e => setForm({ ...form, ref: e.target.value })}
        />

        <button
          onClick={() => navigate("/payment-confirm", { state: { ...form, bankName } })}
          className="w-full text-white p-2 rounded mt-4"
          style={{ backgroundColor: bank.color }}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
