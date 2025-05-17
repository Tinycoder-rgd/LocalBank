// src/components/PaymentForm.tsx
import React, { useState } from 'react';

const PaymentForm = () => {
  const [form, setForm] = useState({
    amount: '',
    phoneNumber: '',
    bankCode: 'EQUITY',
    callbackUrl: 'http://localhost:3000/payment/callback'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount) // make sure it's a number
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);
      alert(`Payment submitted: ${data.message}`);
    } catch (err) {
      console.error('Error:', err);
      alert('Error submitting payment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
