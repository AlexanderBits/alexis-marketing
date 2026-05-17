import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from "@/components/ui/toaster";
import { GlobalSEO } from "@/components/seo/GlobalSEO";
import { queryClientInstance } from '@/lib/query-client';
import NavigationTracker from '@/lib/NavigationTracker';
import { pagesConfig } from './pages.config';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import CookieConsent from '@/components/landing/CookieConsent';
import ContractPage from './pages/ContractPage';
import AdminContractsDashboard from './pages/AdminContractsDashboard';
import BriefingForm from './pages/BriefingForm';
import AdminBriefing from './pages/AdminBriefing';
import AdminBilling from './pages/AdminBilling';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] text-white gap-4">
          <p className="text-white/60 text-center px-4">Algo deu errado. Por favor, recarregue a página.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#CBFF4D] text-black px-6 py-2 font-bold hover:bg-white transition-colors"
          >
            Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const PROTECTED_ROUTES = ['/contrato', '/briefing', '/admin-contratos', '/admin-briefing', '/admin-billing', '/admin-leads'];

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError?.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  const isProtectedRoute = PROTECTED_ROUTES.some(route => window.location.pathname.startsWith(route));

  if (authError?.type === 'auth_required' && isProtectedRoute && window.location.pathname !== '/login') {
    navigateToLogin();
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/contrato" element={<ContractPage />} />
      <Route path="/admin-contratos" element={<AdminContractsDashboard />} />
      <Route path="/briefing" element={<BriefingForm />} />
      <Route path="/admin-briefing" element={<AdminBriefing />} />
      <Route path="/admin-billing" element={<AdminBilling />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <GlobalSEO />
            <NavigationTracker />
            <ErrorBoundary>
              <AuthenticatedApp />
            </ErrorBoundary>
            <CookieConsent />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
