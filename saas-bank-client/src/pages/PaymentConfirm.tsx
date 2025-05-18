// src/pages/PaymentConfirm.tsx
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    account = "10555601",
    sort = "406650",
    ref = "12345678",
    bankName = "Lloyds Bank",
    amount = "1.00",
    payee = "Test",
  } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md shadow-md border rounded-lg p-6">
        <h1 className="text-lg font-semibold text-center mb-4">Bank Payment</h1>
        <h2 className="text-md font-medium mb-4">Payment Details</h2>

        <div className="space-y-2 text-sm">
          <Detail label="Single Payment" value={`£${amount}`} />
          <Detail label="Payee" value={payee} />
          <Detail label="Payee Account #" value={account} />
          <Detail label="Payee Sort Code" value={sort} />
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Bank</span>
            <div>
              <span className="mr-2">{bankName}</span>
              <button
                className="text-blue-600 underline text-sm"
                onClick={() => navigate("/")}
              >
                Change
              </button>
            </div>
          </div>
          <Detail label="Reference #" value={ref} />
        </div>

        <div className="mt-6 space-y-2">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/receipt", { state: { account, sort, ref, bankName, amount } })}
          >
            Accept and Continue to Your Bank
          </button>
          <button
            className="w-full border border-gray-300 text-gray-700 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
