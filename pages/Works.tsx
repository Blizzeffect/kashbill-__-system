import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { Filter, PlayCircle, Download } from 'lucide-react';
import { siteConfig } from '../src/site.config';

const PROJECTS = siteConfig.projects;

const CATEGORIES = ['All', 'Sound Design', 'Composition', 'UI SFX', 'Foley'];

export default function Works() {
  const [filter, setFilter] = useState('All');

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
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-grid-line pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            The Works <span className="text-primary text-2xl align-top font-mono">[V.2.0]</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">SESSION_ID: 8X-92 // SELECT ITEM FOR DEEP SCAN</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all whitespace-nowrap ${filter === cat
                ? 'bg-primary text-black border-primary font-bold'
                : 'bg-transparent text-gray-500 border-grid-line hover:border-gray-500 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className="group relative bg-surface border border-grid-line rounded overflow-hidden hover:border-primary hover:shadow-[0_0_20px_rgba(234,255,0,0.15)] transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden relative bg-black">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                />

                {/* Overlay Data */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                  <div className="space-y-2 text-center mb-4">
                    <span className="inline-block px-2 py-1 border border-primary text-[10px] font-mono text-primary bg-black">
                      {project.audioSpec}
                    </span>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-gray-300 font-mono">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <button className="bg-primary text-black font-bold text-xs px-6 py-2 rounded-full hover:bg-white transition-colors flex items-center gap-2">
                    <PlayCircle size={14} /> DEMO
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <Download size={16} className="text-gray-600 group-hover:text-primary cursor-pointer hover:scale-110 transition-all" />
                </div>
                <p className="text-sm text-gray-500 font-mono mb-1">{project.category}</p>
                <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-grid-line pl-3">{project.description}</p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <button className="px-8 py-3 bg-transparent border border-gray-700 text-gray-400 font-mono text-xs hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
          LOAD_MORE_PROJECTS_
        </button>
      </div>
    </motion.div>
  );
}