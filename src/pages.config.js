import Home from './pages/Home';
import GoogleMeuNegocio from './pages/GoogleMeuNegocio';
import GestaoRedesSociais from './pages/GestaoRedesSociais';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import LoginPage from './pages/Login';
import AdminContractsDashboard from './pages/AdminContractsDashboard';
import AdminSocialLeads from './pages/AdminSocialLeads';
import AdminSEO from './pages/AdminSEO';
import AdminPesquisaSites from './pages/AdminPesquisaSites';
import ContractPage from './pages/ContractPage';
import HunterDom from './pages/HunterDom';
import GestaoObras from './pages/GestaoObras';
import ReativacaoEmailNortecnet from './pages/ReativacaoEmailNortecnet';




export const PAGES = {
    "Home": Home,
    "google-meu-negocio": GoogleMeuNegocio,
    "gestao-de-redes-sociais": GestaoRedesSociais,
    "politica-de-privacidade": PrivacyPolicy,
    "termos-de-uso": TermsOfUse,
    "admin-contratos": AdminContractsDashboard,
    "admin-leads": AdminSocialLeads,
    "admin-seo": AdminSEO,
    "admin-pesquisa-sites": AdminPesquisaSites,
    "contrato": ContractPage,
    "login": LoginPage,
    "performance": HunterDom,
    "gestao-obras": GestaoObras,
    "reativacao-email-nortecnet": ReativacaoEmailNortecnet,
}


export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};
