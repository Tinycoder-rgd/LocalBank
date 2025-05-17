import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankSelection from './pages/BankSelection';
import BankAmountPage from './pages/BankAmountPage';
import BankPayment from './pages/BankPayment';
import PaymentConfirm from './pages/PaymentConfirm';
import NotFound from './pages/NotFound';
import BankDetailsPage from './pages/BankDetailsPage';
import PaymentForm from './components/PaymentForm'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankSelection />} />
        <Route path="/amount/:bankId" element={<BankAmountPage />} />
        <Route path="/payment/:bankId" element={<BankPayment />} />
        <Route path="/pay/:bankId/details" element={<BankDetailsPage />} />
        <Route path="/payment-confirm" element={<PaymentConfirm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
  function App() {
  return (
    <div className="App">
      <h1>Test Payment</h1>
      <PaymentForm />
    </div>
  );
}
}

export default App;
