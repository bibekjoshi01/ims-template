// pages/errors/404Page.jsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you&apos;re looking for doesn&apos;t exist.</p>
    <Link to="/">Go to Home Page</Link>
  </div>
);

export default NotFoundPage;
