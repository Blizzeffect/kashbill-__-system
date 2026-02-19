import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Globe, Mail, Link as LinkIcon, Download } from 'lucide-react';
import { siteConfig } from '../src/site.config';

export default function Bio() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start"
        >
            {/* Left: Image */}
            <div className="w-full lg:w-5/12 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary z-20"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary z-20"></div>

                <div className="relative rounded-lg overflow-hidden border border-grid-line bg-surface shadow-2xl aspect-[3/4] group">
                    {/* Scanner Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent h-[10%] w-full animate-scan z-20 pointer-events-none"></div>

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDhoNDB2NDBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30"></div>

                    <img
                        src={siteConfig.images.bio}
                        alt={`${siteConfig.name} Portrait`}
                        className="w-full h-full object-cover object-top scale-105 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/800x1000/000000/FFFFFF?text=BIO_IMAGE_MISSING';
                        }}
                    />

                    {/* HUD Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-secondary/50 rounded-full z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 bg-secondary"></div>
                    </div>

                    <div className="absolute bottom-4 right-4 z-20 font-mono text-[10px] text-primary bg-black/80 px-2 py-1 backdrop-blur-sm border border-primary/30">
                        ISO: 800 // f/1.8
                    </div>
                </div>

                <div className="mt-4 flex justify-between font-mono text-xs text-gray-500">
                    <div className="flex flex-col">
                        <span className="text-secondary">COORD_X: 049.21</span>
                        <span className="text-secondary">COORD_Y: 921.05</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-primary tracking-widest">LIVE_FEED</span>
                    </div>
                </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-7/12 pt-8">
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="border-l-4 border-primary pl-8 mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4">
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
                    <p className="text-xl text-gray-400 font-medium tracking-wide font-mono">
                        {siteConfig.role.split(' // ')[0]} <span className="text-primary mx-2">//</span> {siteConfig.role.split(' // ')[1] || 'CREATIVE'}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-surface border border-grid-line rounded-lg p-8 mb-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>

                    <div className="flex items-center gap-2 mb-6 border-b border-grid-line pb-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                        </div>
                        <span className="font-mono text-xs text-gray-500 ml-2">bio_data.txt</span>
                    </div>

                    <div className="space-y-4 font-mono text-gray-300 text-sm leading-relaxed">
                        {siteConfig.bio.map((paragraph, index) => (
                            <p key={index}>
                                <span className="text-primary mr-2">&gt;</span>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    <div className="border border-grid-line bg-surface/50 p-4 rounded hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <Activity className="text-gray-500" size={18} />
                            <span className="text-[10px] font-mono text-primary bg-primary/10 px-1 rounded">AUDIO</span>
                        </div>
                        <div className="font-mono text-xs text-gray-500">FREQ RANGE</div>
                        <div className="text-white font-bold text-lg">20Hz-20kHz</div>
                    </div>

                    <div className="border border-grid-line bg-surface/50 p-4 rounded hover:border-secondary/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <Cpu className="text-gray-500" size={18} />
                            <span className="text-[10px] font-mono text-secondary bg-secondary/10 px-1 rounded">SYS</span>
                        </div>
                        <div className="font-mono text-xs text-gray-500">CPU LOAD</div>
                        <div className="text-white font-bold text-lg">{siteConfig.stats.cpuLoad}</div>
                    </div>

                    <div className="border border-grid-line bg-surface/50 p-4 rounded hover:border-green-500/50 transition-colors col-span-2 md:col-span-1">
                        <div className="flex items-center justify-between mb-2">
                            <Globe className="text-gray-500" size={18} />
                            <span className="text-[10px] font-mono text-green-400 bg-green-400/10 px-1 rounded">STATUS</span>
                        </div>
                        <div className="font-mono text-xs text-gray-500">AVAILABILITY</div>
                        <div className="text-white font-bold text-lg">OPEN</div>
                    </div>
                </div>

                {/* Contact Actions */}
                <div className="flex flex-wrap gap-4 items-center">
                    <span className="font-mono text-xs text-gray-500 mr-2">CONNECT_NODES:</span>

                    <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-2 px-4 py-2 border border-grid-line rounded hover:bg-surface-light transition-all">
                        <Mail size={14} className="text-gray-400 group-hover:text-secondary" />
                        <span className="font-mono text-xs text-gray-300 group-hover:text-white">EMAIL</span>
                    </a>

                    <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2 border border-grid-line rounded hover:bg-surface-light transition-all">
                        <LinkIcon size={14} className="text-gray-400 group-hover:text-secondary" />
                        <span className="font-mono text-xs text-gray-300 group-hover:text-white">LINKEDIN</span>
                    </a>

                    <a href={siteConfig.contact.resume} target="_blank" rel="noopener noreferrer" className="ml-auto bg-primary text-black px-6 py-2 rounded font-bold text-sm hover:bg-white transition-colors flex items-center gap-2">
                        <Download size={16} /> RESUME_V2.PDF
                    </a>
                </div>
            </div>
        </motion.div>
    );
}