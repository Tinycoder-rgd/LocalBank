import React, { useState} from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BankPayment = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const decodedBank = decodeURIComponent(bankId || '');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const amountFromQuery = searchParams.get('amount') || '';

  const [formData, setFormData] = useState({
    accountNumber: '',
    accountName: '',
    phone: '',
    amount: amountFromQuery,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { accountNumber, accountName, phone, amount } = formData;

    if (!accountNumber || !accountName || !phone || !amount) {
      alert('Please fill in all fields');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Enter a valid amount greater than zero');
      return;
    }

    setIsProcessing(true);

    try {
      await axios.post('http://localhost:3001/payment/process', {
        bank: decodedBank,
        accountNumber,
        accountName,
        phone,
        amount: amountNum,
      });
      setIsProcessing(false);
      navigate('/payment-confirm', {
        state: { success: true, amount: amountNum, bank: decodedBank },
      });
    } catch (error) {
      setIsProcessing(false);
      setPaymentStatus('Payment failed. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Pay with {decodedBank}</h2>

      <input
        type="text"
        name="accountNumber"
        placeholder="Account Number"
        value={formData.accountNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        name="accountName"
        placeholder="Account Holder Name"
        value={formData.accountName}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={isProcessing}
        className={`w-full py-2 rounded ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Submit Payment'}
      </button>

      {paymentStatus && (
        <p className="mt-4 text-center text-red-600">{paymentStatus}</p>
      )}
    </div>
  );
};

export default BankPayment;
