import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, Mic, Music, Volume2, Zap, Radio, Layers, Activity } from 'lucide-react';
import { SoundPad } from '../types';
import { siteConfig } from '../src/site.config';
import { useLanguage } from '../src/contexts/LanguageContext';

const ICON_MAP: Record<string, React.ElementType> = {
    Music, Radio, Activity, Mic, Zap, Volume2, Layers
};

const PADS: SoundPad[] = siteConfig.lab.pads.map(pad => ({
    ...pad,
    icon: pad.icon // We will render this dynamically
}));

const Fader: React.FC<{ label: string; color: string }> = ({ label, color }) => (
    <div className="flex flex-col items-center h-32 w-12 group">
        <div className="relative h-full w-4 bg-gray-900 overflow-hidden">
            <div className={`absolute bottom-0 w-full ${color === 'primary' ? 'bg-white/20' : 'bg-white/20'} h-2/3`}></div>
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 90 }}
                dragElastic={0}
                dragMomentum={false}
                className={`absolute top-10 -left-1 w-6 h-8 bg-white shadow-md cursor-grab active:cursor-grabbing flex items-center justify-center`}
            >
                <div className="w-4 h-[2px] bg-black"></div>
            </motion.div>
        </div>
        <span className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default function Lab() {
    const { t } = useLanguage();
    const [activePad, setActivePad] = useState<string | null>(null);
    const [envWarehouse, setEnvWarehouse] = useState(true);

    const triggerPad = (id: string, audioSrc?: string) => {
        setActivePad(id);
        if (audioSrc) {
            // Here you would implement actual audio playback
            // const audio = new Audio(audioSrc);
            // audio.play();
            console.log(`Playing: ${audioSrc}`);
        }
        setTimeout(() => setActivePad(null), 150);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-6 max-w-7xl mx-auto"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-6 border-b border-white/20 gap-4">
                <div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-2">{t('lab.title')}</h1>
                    <p className="text-sm text-gray-400 font-bold tracking-widest uppercase">{t('lab.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 text-gray-400 hover:text-primary border border-grid-line rounded hover:border-primary transition-colors">
                        <Settings size={18} />
                    </button>
                    <button className="flex items-center gap-2 bg-surface border border-grid-line px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-secondary hover:bg-secondary hover:text-black transition-all">
                        <Download size={16} /> {t('lab.export')}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-12">
                    {/* Display */}
                    <div className="border-t border-white/20 pt-6">
                        <div className="text-left">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('lab.signal')}</p>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                                {activePad ? PADS.find(p => p.id === activePad)?.label : t('lab.ready')}
                            </h3>
                        </div>
                    </div>

                    {/* Faders */}
                    <div className="flex justify-between border-t border-white/20 pt-8">
                        <Fader label={t('lab.left')} color="secondary" />
                        <Fader label={t('lab.right')} color="secondary" />
                        <Fader label={t('lab.master')} color="primary" />
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-grow">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
                        {PADS.map((pad) => {
                            const IconComponent = ICON_MAP[pad.icon] || Music;
                            return (
                                <motion.button
                                    key={pad.id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => triggerPad(pad.id, pad.audioSrc)}
                                    className={`
                                relative aspect-square border border-white/20 
                                flex flex-col items-center justify-center gap-4
                                transition-all duration-100 overflow-hidden group
                                ${activePad === pad.id
                                            ? 'bg-white border-white text-black'
                                            : 'bg-black hover:bg-gray-900 hover:border-white'
                                        }
                            `}
                                >
                                    <IconComponent
                                        size={40}
                                        className={`transition-colors ${activePad === pad.id ? 'text-black' : 'text-white'}`}
                                    />
                                    <span className={`text-sm font-bold tracking-widest uppercase ${activePad === pad.id ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>{pad.label}</span>
                                </motion.button>
                            );
                        })}

                        {/* Empty slots for visual grid completion */}
                        {[...Array(8)].map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square border border-white/5 bg-black/50 flex items-center justify-center opacity-50">
                                <span className="text-gray-800 font-bold text-lg">+</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}