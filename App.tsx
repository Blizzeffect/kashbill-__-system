import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Terminal,
  Activity,
  Mic2,
  Disc,
  Menu,
  X,
  Globe,
  Share2,
  Mail,
  Zap,
  Volume2,
  Cpu
} from 'lucide-react';
import Home from './pages/Home';
import Works from './pages/Works';
import Lab from './pages/Lab';
import Bio from './pages/Bio';
import { siteConfig } from './src/site.config';

const NavLink: React.FC<{ to: string; children: React.ReactNode; isActive: boolean; onClick?: () => void }> = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`relative px-4 py-2 font-bold text-sm tracking-widest uppercase transition-colors duration-300 group overflow-hidden ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {children}
    </span>
    {isActive && (
      <motion.div
        layoutId="navHighlight"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </Link>
);

import { useLanguage } from './src/contexts/LanguageContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 w-full z-40 bg-carbon/90 backdrop-blur-md border-b border-grid-line">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold group-hover:scale-105 transition-transform overflow-hidden">
            {siteConfig.images.logo ? (
              <img src={siteConfig.images.logo} alt="Logo" className="w-full h-full object-contain p-1" />
            ) : (
              <Activity size={24} />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-black text-2xl tracking-tighter leading-none group-hover:text-gray-300 transition-colors uppercase">
              {siteConfig.name}
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/log" isActive={location.pathname === '/log'}>{t('nav.log')}</NavLink>
          <NavLink to="/works" isActive={location.pathname === '/works'}>{t('nav.works')}</NavLink>
          <NavLink to="/lab" isActive={location.pathname === '/lab'}>{t('nav.lab')}</NavLink>
          <NavLink to="/" isActive={location.pathname === '/'}>{t('nav.bio')}</NavLink>

          <a href={`mailto:${siteConfig.contact.email}`} className="ml-8 bg-white text-black px-6 py-2 font-bold text-xs uppercase hover:bg-gray-200 transition-all flex items-center gap-2">
            <Mail size={14} />
            {t('nav.contact')}
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="ml-4 px-3 py-1 border border-white/20 text-xs font-bold text-white uppercase tracking-widest hover:border-white transition-colors"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="px-2 py-1 border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest hover:border-white transition-colors"
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            className="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-grid-line overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4 border-t border-white/10">
              <NavLink to="/log" isActive={location.pathname === '/log'} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.log')}</NavLink>
              <NavLink to="/works" isActive={location.pathname === '/works'} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.works')}</NavLink>
              <NavLink to="/lab" isActive={location.pathname === '/lab'} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.lab')}</NavLink>
              <NavLink to="/" isActive={location.pathname === '/'} onClick={() => setIsMobileMenuOpen(false)}>{t('nav.bio')}</NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Globe size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Share2 size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Zap size={20} /></a>
        </div>

        <div className="text-xs font-bold text-gray-500 tracking-widest uppercase">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
      </div>
    </footer>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Bio />} />
        <Route path="/log" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black flex flex-col selection:bg-white selection:text-black">
        <Header />

        <main className="flex-grow pt-20 relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}