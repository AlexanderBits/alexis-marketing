import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { queryClientInstance } from '@/lib/query-client'

// Force unregister any existing service workers to solve cache persistence issues
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (let registration of registrations) {
      registration.unregister();
      console.log('Service Worker unregistered');
    }
  });
}

// Clear React Query cache once to ensure fresh data from API
// This is useful after a new deploy when data structures might have changed
const CACHE_BUSTER_KEY = 'alexis_cache_bust_20260321_1'; // Updated timestamp/key
if (localStorage.getItem('app_cache_busted') !== CACHE_BUSTER_KEY) {
  queryClientInstance.clear();
  localStorage.setItem('app_cache_busted', CACHE_BUSTER_KEY);
  console.log('React Query cache cleared for new version');
}

// Força invalidação de cache em Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister())
  })
}

import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)