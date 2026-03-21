import Home from './pages/Home';
import GoogleMeuNegocio from './pages/GoogleMeuNegocio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import LoginPage from './pages/Login';
import AdminContractsDashboard from './pages/AdminContractsDashboard';
import ContractPage from './pages/ContractPage';


export const PAGES = {
    "Home": Home,
    "google-meu-negocio": GoogleMeuNegocio,
    "politica-de-privacidade": PrivacyPolicy,
    "termos-de-uso": TermsOfUse,
    "admin-contratos": AdminContractsDashboard,
    "contrato": ContractPage,
    "login": LoginPage,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};