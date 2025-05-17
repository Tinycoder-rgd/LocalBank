import { useNavigate } from 'react-router-dom';

const BankSelection = () => {
  const navigate = useNavigate();

  const banks = [
    'Equity Bank',
    'KCB Bank',
    'Co-Operative Bank',
    
  ];

  const handleBankSelect = (bank: string) => {
    navigate(`/amount/${encodeURIComponent(bank)}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 font-semibold">Select Your Bank</h2>
      <ul>
        {banks.map((bank) => (
          <li
            key={bank}
            className="cursor-pointer border rounded p-4 mb-2 hover:bg-blue-100"
            onClick={() => handleBankSelect(bank)}
          >
            {bank}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankSelection;
