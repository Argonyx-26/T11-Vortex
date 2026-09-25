import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import PhoneCameraFeed from './components/PhoneCameraFeed.jsx';
import './index.css';

// Handle /camera-feed route for remote phone CCTV transmitter
const isCameraFeedRoute = 
  window.location.pathname.toLowerCase().includes('camera-feed') || 
  window.location.hash.toLowerCase().includes('camera-feed');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isCameraFeedRoute ? <PhoneCameraFeed /> : <App />}
  </React.StrictMode>,
);
