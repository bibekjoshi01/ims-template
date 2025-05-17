import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// google-fonts
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';

// project import
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // ==============================|| MAIN - REACT DOM RENDER ||============================== //
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
