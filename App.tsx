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
    className={`relative px-4 py-2 font-mono text-sm tracking-wider transition-colors duration-300 group overflow-hidden ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {isActive && <span className="text-primary mr-1">&gt;</span>}
      {children}
    </span>
    {isActive && (
      <motion.div
        layoutId="navHighlight"
        className="absolute inset-0 bg-primary/10 border-b border-primary"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </Link>
);

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-carbon/90 backdrop-blur-md border-b border-grid-line">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary text-black flex items-center justify-center rounded-sm font-bold group-hover:scale-105 transition-transform overflow-hidden">
            {siteConfig.images.logo ? (
              <img src={siteConfig.images.logo} alt="Logo" className="w-full h-full object-contain p-1" />
            ) : (
              <Activity size={24} />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-display font-bold text-xl tracking-tighter leading-none group-hover:text-primary transition-colors">
              {siteConfig.name} <span className="text-gray-600 font-mono text-sm">// SYS</span>
            </h1>
            <span className="text-[10px] font-mono text-primary/80 tracking-widest mt-1">{siteConfig.status.label}: <span className={`text-${siteConfig.status.color}-500 animate-pulse`}>{siteConfig.status.value}</span></span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/log" isActive={location.pathname === '/log'}>WORK_LOG</NavLink>
          <NavLink to="/works" isActive={location.pathname === '/works'}>PROJECTS</NavLink>
          <NavLink to="/lab" isActive={location.pathname === '/lab'}>SOUND_LAB</NavLink>
          <NavLink to="/" isActive={location.pathname === '/'}>BIO_SCAN</NavLink>

          <a href={`mailto:${siteConfig.contact.email}`} className="ml-8 border border-primary text-primary px-4 py-2 rounded-sm font-mono text-xs font-bold hover:bg-primary hover:text-black transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(234,255,0,0.15)] hover:shadow-[0_0_20px_rgba(234,255,0,0.4)]">
            <Mail size={14} />
            INIT_CONTACT
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
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
            <nav className="flex flex-col p-6 gap-4">
              <NavLink to="/log" isActive={location.pathname === '/log'} onClick={() => setIsMobileMenuOpen(false)}>WORK_LOG</NavLink>
              <NavLink to="/works" isActive={location.pathname === '/works'} onClick={() => setIsMobileMenuOpen(false)}>PROJECTS</NavLink>
              <NavLink to="/lab" isActive={location.pathname === '/lab'} onClick={() => setIsMobileMenuOpen(false)}>SOUND_LAB</NavLink>
              <NavLink to="/" isActive={location.pathname === '/'} onClick={() => setIsMobileMenuOpen(false)}>BIO_SCAN</NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-carbon border-t border-grid-line py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-500 tracking-widest">
            SERVER_STATUS: STABLE // LATENCY: 4ms
          </span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Globe size={18} /></a>
          <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Share2 size={18} /></a>
          <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Zap size={18} /></a>
        </div>

        <div className="text-[10px] font-mono text-gray-600">
          © {new Date().getFullYear()} {siteConfig.name} AUDIO SYSTEMS // ID: 9942-AX
        </div>
      </div>
    </footer>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
      <div className="min-h-screen bg-carbon flex flex-col font-display text-gray-200 selection:bg-primary selection:text-black">
        {/* Background Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            opacity: 0.5
          }}
        />

        <Header />

        <main className="flex-grow pt-20 relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}