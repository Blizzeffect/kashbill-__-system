import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Globe, Mail, Link as LinkIcon, Download } from 'lucide-react';
import { siteConfig } from '../src/site.config';

import { useLanguage } from '../src/contexts/LanguageContext';

export default function Bio() {
    const { language, t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start"
        >
            {/* Left: Image */}
            <div className="w-full lg:w-5/12 relative">
                <div className="relative aspect-[3/4] group overflow-hidden bg-black">
                    <img
                        src={siteConfig.images.bio}
                        alt={`${siteConfig.name} Portrait`}
                        className="w-full h-full object-cover object-top grayscale contrast-125 hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/800x1000/000000/FFFFFF?text=BIO_IMAGE_MISSING';
                        }}
                    />
                </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-7/12 pt-8">
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
                        {siteConfig.images.logo ? (
                            <img
                                src={siteConfig.images.logo}
                                alt={siteConfig.name}
                                className="h-40 md:h-64 w-auto object-contain object-left brightness-0 invert"
                            />
                        ) : (
                            siteConfig.name
                        )}
                    </h1>
                    <p className="text-2xl text-white font-bold tracking-wide uppercase flex flex-wrap items-center">
                        {siteConfig.role.split(' // ').map((r, i, arr) => (
                            <React.Fragment key={i}>
                                <span>{r}</span>
                                {i < arr.length - 1 && <span className="text-gray-600 mx-2">/</span>}
                            </React.Fragment>
                        ))}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed font-serif">
                        {siteConfig.bio.map((paragraph, index) => (
                            <p key={index}>
                                {paragraph[language as keyof typeof paragraph]}
                            </p>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Actions */}
                <div className="flex flex-wrap gap-6 items-center border-t border-white/20 pt-8">

                    <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-3 px-6 py-4 border border-white/20 hover:border-white transition-all bg-black">
                        <Mail size={18} className="text-white group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm text-white tracking-widest uppercase">{t('bio.email')}</span>
                    </a>

                    <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-4 border border-white/20 hover:border-white transition-all bg-black">
                        <LinkIcon size={18} className="text-white group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-sm text-white tracking-widest uppercase">{t('bio.linkedin')}</span>
                    </a>

                    <a href={siteConfig.contact.resume} target="_blank" rel="noopener noreferrer" className="ml-auto bg-white text-black px-8 py-4 font-black text-sm hover:bg-gray-200 transition-colors flex items-center gap-3 uppercase tracking-widest">
                        <Download size={20} /> {t('bio.resume')}
                    </a>
                </div>
            </div>
        </motion.div>
    );
}