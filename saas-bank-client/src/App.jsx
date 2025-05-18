// src/App.tsx or wherever your routing is defined
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BankSelection from "./pages/BankSelection";
import BankDetails from "./pages/BankDetails";
import PaymentConfirm from "./pages/PaymentConfirm"; // (later step)
import ReceiptPage from "./pages/ReceiptPage"; // (later step)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankSelection />} />
        <Route path="/bank-details/:bankName" element={<BankDetails />} />
        <Route path="/receipt" element={<ReceiptPage />} />

        <Route path="/payment-confirm" element={<PaymentConfirm />} />
      </Routes>
    </Router>
  );
}

export default App;
