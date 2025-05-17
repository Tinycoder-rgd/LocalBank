import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const banks = [
  { id: 'equity', name: 'Equity Bank', description: 'Secure transfer with Equity Bank', recommended: true },
  { id: 'kcb', name: 'KCB Bank', description: 'Fast local bank transfer' },
];

const LocalBankOptions = () => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedBank && amount && parseFloat(amount) > 0) {
      navigate(`/pay/${encodeURIComponent(selectedBank)}?amount=${encodeURIComponent(amount)}`);
    } else {
      alert('Please select a bank and enter a valid amount');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Local Bank Payment</h2>

        {/* Amount Input */}
        <label className="block mb-2 font-medium text-gray-700" htmlFor="amount">
          Enter Amount
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full mb-6 px-4 py-2 border rounded focus:outline-blue-500"
        />

        {/* Bank List */}
        <fieldset className="mb-6">
          <legend className="font-medium mb-3 text-gray-700">Select your bank</legend>
          <div className="space-y-3">
            {banks.map((bank) => (
              <label
                key={bank.id}
                className="flex items-center cursor-pointer space-x-3"
              >
                <input
                  type="radio"
                  name="bank"
                  value={bank.id}
                  checked={selectedBank === bank.id}
                  onChange={() => setSelectedBank(bank.id)}
                  className="form-radio text-blue-600"
                />
                <div>
                  <p className="font-semibold">{bank.name}</p>
                  <p className="text-sm text-gray-600">{bank.description}</p>
                </div>
                {bank.recommended && (
                  <span className="ml-auto text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          disabled={!selectedBank || !amount || parseFloat(amount) <= 0}
          onClick={handleContinue}
          className={`w-full py-2 rounded text-white ${
            selectedBank && amount && parseFloat(amount) > 0
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default LocalBankOptions;
