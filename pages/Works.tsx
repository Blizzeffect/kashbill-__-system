import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Filter, PlayCircle, Download } from 'lucide-react';
import { siteConfig } from '../src/site.config';
import { useLanguage } from '../src/contexts/LanguageContext';

const PROJECTS = siteConfig.projects;

export default function Works() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('All');

  // Hardcode translated categories or logic here. Let's keep data logic simple.
  const CATEGORIES = ['All', 'Sound Design', 'Composition', 'UI SFX', 'Foley'];

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-6 py-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 border-b border-grid-line pb-6 gap-6">
        <div className="w-full xl:w-auto overflow-hidden">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-4 xl:mb-0 truncate xl:overflow-visible xl:whitespace-normal">
            {t('works.title')}
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 w-full xl:w-auto xl:pb-0 hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-bold text-sm uppercase tracking-widest transition-all whitespace-nowrap ${filter === cat
                ? 'bg-white text-black'
                : 'bg-transparent text-gray-500 hover:text-white'
                }`}
            >
              {cat === 'All' ? t('works.allFiles') : cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={project.id}
              className="group relative flex flex-col gap-4"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-black">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">{project.title}</h3>
                  <a href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                    <PlayCircle size={20} />
                  </a>
                </div>

                <div className="flex justify-between items-center border-b border-white/20 pb-4">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{project.category}</p>
                  <p className="text-xs font-bold text-gray-600 uppercase">{project.audioSpec}</p>
                </div>

                <p className="text-base text-gray-400 leading-relaxed font-serif mt-2">
                  {typeof project.description === 'string'
                    ? project.description
                    : (project.description as any)[language]}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-24 flex justify-center">
        <button className="px-12 py-4 border border-white/20 text-white font-bold text-sm hover:bg-white hover:text-black transition-all uppercase tracking-widest">
          LOAD MORE
        </button>
      </div>
    </motion.div>
  );
}