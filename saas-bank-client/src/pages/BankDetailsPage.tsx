import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const BankDetailsPage = () => {
  const navigate = useNavigate();
  const { bankId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const amount = query.get('amount') || '';

  const [formData, setFormData] = useState({
    accountNumber: '',
    accountName: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.accountNumber || !formData.accountName || !formData.phone) {
      setError('Please fill in all fields.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      await axios.post('http://localhost:3001/payment/process', {
        ...formData,
        amount,
        bank: bankId,
      });
      setSuccessMsg(`Payment of ${amount} to ${bankId} was successful!`);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Bank Details for {decodeURIComponent(bankId || '')}</h2>
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="accountName"
          placeholder="Account Holder Name"
          value={formData.accountName}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-2">{successMsg}</p>}
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`w-full py-2 px-4 rounded text-white ${isProcessing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isProcessing ? 'Processing...' : 'Submit Payment'}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-blue-600 underline"
        >
          ← Back to Amount
        </button>
      </div>
    </div>
  );
};

export default BankDetailsPage;
