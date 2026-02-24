import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Cpu, Disc, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../src/site.config';

const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={`relative group inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-red-500 opacity-0 group-hover:opacity-70 animate-pulse">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-secondary opacity-0 group-hover:opacity-70 animate-pulse delay-75">{text}</span>
    </div>
  );
};

const StatBlock: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col border-t border-white/20 pt-4 group">
    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
      {icon} {label}
    </div>
    <div className="text-2xl font-black text-white">{value}</div>
  </div>
);

import { useLanguage } from '../src/contexts/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-7xl mx-auto w-full py-12 md:py-24 relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase"
            >
              <GlitchText text={siteConfig.home.line1} /> <br />
              <span className="text-gray-400">{siteConfig.home.line2}</span> <br />
              <GlitchText text={siteConfig.home.line3} />
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 font-serif max-w-2xl leading-relaxed"
            >
              {siteConfig.description[language as keyof typeof siteConfig.description]}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-6 items-center"
            >
              <Link to="/lab" className="group flex items-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                <Play className="fill-black" size={18} />
                {t('lab.title')}
              </Link>

              <Link to="/works" className="group flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm border-b border-transparent hover:border-white pb-1 transition-all">
                <span>{t('works.title')}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 grid gap-8 border-l border-white/10 pl-8"
          >
            <StatBlock label={t('home.cpuLoad')} value={siteConfig.stats.cpuLoad} icon={<Cpu size={16} />} />
            <StatBlock label={t('home.latency')} value={siteConfig.stats.latency} icon={<Activity size={16} />} />
            <StatBlock label={t('home.projects')} value={siteConfig.stats.projects} icon={<Disc size={16} />} />
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute -bottom-20 -left-20 text-[20vw] font-bold text-white/[0.02] pointer-events-none select-none font-display leading-none">
        AUDIO
      </div>
    </motion.div>
  );
}