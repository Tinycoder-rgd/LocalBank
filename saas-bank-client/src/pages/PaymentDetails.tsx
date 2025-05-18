import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function PaymentDetails() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/ecommerce/amount')
      .then(res => setAmount(res.data.amount))
      .catch(err => console.error('Error fetching amount'));
  }, []);

  const handleAccept = async () => {
    await axios.post('http://localhost:3001/api/payment/initiate', { amount });
    navigate('/receipt');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Payment Details</h2>
      <p>Amount: £{amount}</p>
      <p>Bank: Lloyds</p>
      <button onClick={handleAccept} className="bg-blue-600 text-white mt-4 p-2 rounded">Accept</button>
    </div>
  );
}