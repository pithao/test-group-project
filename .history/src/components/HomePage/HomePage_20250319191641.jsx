import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Swing Dance App!</h1>
      <Link to="/scan">Scan QR Code</Link>
      <Link to="/admin">Admin Panel</Link>
    </div>
  );
};

export default HomePage;
