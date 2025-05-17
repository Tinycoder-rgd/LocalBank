import { useLocation, useNavigate } from 'react-router-dom';

const PaymentConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Expect success info passed in state from navigation
  const { state } = location;
  const success = state?.success || false;
  const amount = state?.amount || 0;
  const bank = state?.bank || '';

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      {success ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-green-600">
            Payment Successful!
          </h2>
          <p className="mb-2">
            You have paid <strong>${amount.toFixed(2)}</strong> to{' '}
            <strong>{bank}</strong>.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h2>
          <p>Please try again later.</p>
        </>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );
};

export default PaymentConfirm;
