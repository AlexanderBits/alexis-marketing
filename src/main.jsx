import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App.jsx';
import '@/index.css';
import { queryClientInstance } from '@/lib/query-client';

const CACHE_BUST = 'alexis_v20260515_1811';

// Service Worker cleanup
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(r => r.unregister());
  });
}

// React Query cache invalidation
if (localStorage.getItem('app_cache_busted') !== CACHE_BUST) {
  queryClientInstance.clear();
  localStorage.setItem('app_cache_busted', CACHE_BUST);
  console.log('CACHE_CLEAR', CACHE_BUST);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
