import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QRScanner from './components/QRScanner/QRScanner';
import SurveyForm from './components/SurveyForm/SurveyForm';
import AdminPanel from './components/AdminPanel/AdminPanel';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />

        {/* QR Code Scanner */}
        <Route path="/scan" element={<QRScanner />} />

        {/* Dynamic Survey Route */}
        <Route path="/survey/:type" element={<SurveyForm />} />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
