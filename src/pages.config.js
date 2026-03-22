import Home from './pages/Home';
import GoogleMeuNegocio from './pages/GoogleMeuNegocio';
import GestaoRedesSociais from './pages/GestaoRedesSociais';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import LoginPage from './pages/Login';
import AdminContractsDashboard from './pages/AdminContractsDashboard';
import AdminSocialLeads from './pages/AdminSocialLeads';
import AdminSEO from './pages/AdminSEO';
import ContractPage from './pages/ContractPage';


export const PAGES = {
    "Home": Home,
    "google-meu-negocio": GoogleMeuNegocio,
    "gestao-de-redes-sociais": GestaoRedesSociais,
    "politica-de-privacidade": PrivacyPolicy,
    "termos-de-uso": TermsOfUse,
    "admin-contratos": AdminContractsDashboard,
    "admin-leads": AdminSocialLeads,
    "admin-seo": AdminSEO,
    "contrato": ContractPage,
    "login": LoginPage,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};