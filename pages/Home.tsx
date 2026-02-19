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
  <div className="flex items-center gap-4 bg-surface/50 border border-grid-line p-4 rounded hover:border-primary/50 transition-colors group">
    <div className="text-gray-500 group-hover:text-primary transition-colors">{icon}</div>
    <div>
      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{label}</div>
      <div className="text-lg font-bold font-mono text-white">{value}</div>
    </div>
  </div>
);

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-7xl mx-auto w-full py-12 md:py-24 relative z-10">

        {/* Floating HUD Elements */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 left-0 hidden lg:flex flex-col gap-1 font-mono text-[10px] text-primary/40"
        >
          <span>COORD: 45.923, -12.004</span>
          <span>FREQ: 44.1kHz / 24bit</span>
          <span>BUF: 1024 spls</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-2 text-primary font-mono text-xs tracking-[0.2em]"
            >
              <Activity size={12} className="animate-pulse" />
              INITIALIZING SEQUENCE...
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8"
            >
              <GlitchText text={siteConfig.home.line1} /> <br />
              <span className="text-primary">{siteConfig.home.line2}</span> <br />
              <GlitchText text={siteConfig.home.line3} />
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 font-mono max-w-2xl border-l-2 border-primary/30 pl-6 leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <Link to="/lab" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded bg-primary px-8 font-medium text-black transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                <Play className="mr-2 fill-black" size={18} />
                <span className="font-bold tracking-widest text-sm">INITIALIZE LAB</span>
              </Link>

              <Link to="/works" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-mono text-sm border-b border-transparent hover:border-primary pb-1 group">
                <span>EXPLORE ARCHIVES</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-4 grid gap-4"
          >
            <StatBlock label="CPU LOAD" value={siteConfig.stats.cpuLoad} icon={<Cpu size={20} />} />
            <StatBlock label="LATENCY" value={siteConfig.stats.latency} icon={<Activity size={20} />} />
            <StatBlock label="PROJECTS" value={siteConfig.stats.projects} icon={<Disc size={20} />} />

            {/* Visualizer Placeholder */}
            <div className="bg-surface/30 border border-grid-line h-40 rounded flex items-end justify-center p-4 gap-1">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-primary/50 rounded-t-sm"
                  animate={{ height: ['20%', '80%', '40%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
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