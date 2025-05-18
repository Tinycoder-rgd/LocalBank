// src/pages/BankSelection.tsx
import { useNavigate } from "react-router-dom";

const banks = [
  { name: "KCB", icon: "/kcb.png" },
  { name: "Equity", icon: "/equity.png" },
  { name: "Cooperative Bank", icon: "/coop.png" },
];

export default function BankSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6">Select Your Bank</h2>

      <div className="w-full max-w-sm space-y-4">
        {banks.map((bank) => (
          <button
            key={bank.name}
            onClick={() => navigate(`/bank-details/${bank.name}`)}
            className="w-full flex items-center gap-4 border p-4 rounded-lg shadow-sm hover:shadow transition"
          >
           
            <span className="text-lg font-medium text-center">{bank.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
