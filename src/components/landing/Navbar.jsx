import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Zap, 
  Instagram, 
  MapPin, 
  Cpu, 
  ArrowLeft 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModernLogo from "@/assets/alexis-logo.png";

const Navbar = ({ variant = "default" }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    {
      to: "/performance",
      icon: <Zap className="w-4 h-4 text-brand-lime" />,
      title: "Performance",
      subtitle: "Tráfego & Vendas"
    },
    {
      to: "/gestao-de-redes-sociais",
      icon: <Instagram className="w-4 h-4 text-brand-lime" />,
      title: "Redes Sociais",
      subtitle: "Posicionamento"
    },
    {
      to: "/google-meu-negocio",
      icon: <MapPin className="w-4 h-4 text-brand-lime" />,
      title: "Google Maps",
      subtitle: "Presença Local"
    },
    {
      to: "/#servicos",
      icon: <Cpu className="w-4 h-4 text-brand-lime" />,
      title: "Desenvolvimento",
      subtitle: "Sites Next-Gen"
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 px-4 md:px-10 py-2 rounded-none flex items-center justify-between w-[95%] max-w-7xl pointer-events-auto shadow-2xl">
        <div className="flex items-center gap-3">
           <Link to="/" className="flex items-center">
              <img src={ModernLogo} alt="Alexis Marketing • Dev" className="h-12 md:h-[60px] w-auto drop-shadow-2xl transition-all" />
           </Link>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-black italic">Início</Link>
          
          <div 
            className="relative group h-full flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-2 hover:text-brand-lime transition-colors py-4 uppercase tracking-widest text-[10px] font-black italic">
              Serviços <ChevronRight className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-90' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-64 bg-black/90 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl z-[100]"
                >
                  <div className="space-y-1">
                    {services.map((service, i) => (
                      <Link 
                        key={i}
                        to={service.to} 
                        className="flex items-center gap-3 p-3 hover:bg-brand-lime/10 transition-colors group/item"
                      >
                        {service.icon}
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-white group-hover/item:text-brand-lime">{service.title}</div>
                          <div className="text-[8px] text-white/40 uppercase tracking-widest">{service.subtitle}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/#portfolio" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-black italic">Portfólio</a>
          <a href="/#sobre-nos" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-black italic">Sobre Nós</a>
          <a href="/#contato" className="hover:text-brand-lime transition-colors uppercase tracking-widest text-[10px] font-black italic">Contato</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://wa.me/5532987037221" 
             className="hidden sm:block bg-brand-lime text-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">
            Falar com Especialista
          </a>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-white hover:text-brand-lime transition-colors">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-brand-dark border-white/10 p-0 rounded-none w-[300px]">
                <SheetHeader className="p-6 border-b border-white/5 bg-black/40">
                  <SheetTitle className="text-white text-left flex items-center gap-2">
                     <img src={ModernLogo} alt="Alexis" className="h-8 w-auto" />
                     <span className="text-xs text-white/40 font-normal uppercase tracking-widest">Menu</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-6 space-y-6">
                  <Link to="/" className="text-xl font-bold text-white hover:text-brand-lime transition-colors uppercase italic">Início</Link>
                  
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Serviços</div>
                    {services.map((service, i) => (
                      <Link key={i} to={service.to} className="flex items-center gap-4 text-lg font-bold text-white/60 hover:text-brand-lime transition-colors">
                        {service.icon} {service.title}
                      </Link>
                    ))}
                  </div>

                  <a href="/#portfolio" className="text-xl font-bold text-white hover:text-brand-lime transition-colors uppercase italic">Portfólio</a>
                  <a href="/#sobre-nos" className="text-xl font-bold text-white hover:text-brand-lime transition-colors uppercase italic">Sobre Nós</a>
                  <a href="/#contato" className="text-xl font-bold text-white hover:text-brand-lime transition-colors uppercase italic">Contato</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
