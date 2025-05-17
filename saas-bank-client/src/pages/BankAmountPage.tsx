import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BankAmountPage = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  const handleContinue = () => {
    if (!amount || isNaN(Number(amount))) {
      alert('Enter a valid amount');
      return;
    }
    navigate(`/pay/${encodeURIComponent(bankId!)}/details?amount=${amount}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Enter Amount to Pay</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button
          onClick={handleContinue}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default BankAmountPage;
