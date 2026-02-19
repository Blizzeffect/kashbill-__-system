import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, Mic, Music, Volume2, Zap, Radio, Layers, Activity } from 'lucide-react';
import { SoundPad } from '../types';
import { siteConfig } from '../src/site.config';

const ICON_MAP: Record<string, React.ElementType> = {
    Music, Radio, Activity, Mic, Zap, Volume2, Layers
};

const PADS: SoundPad[] = siteConfig.lab.pads.map(pad => ({
    ...pad,
    icon: pad.icon // We will render this dynamically
}));

const Fader: React.FC<{ label: string; color: string }> = ({ label, color }) => (
    <div className="flex flex-col items-center h-48 w-12 group">
        <div className="relative h-full w-2 bg-surface-light rounded-full overflow-hidden">
            <div className={`absolute bottom-0 w-full ${color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'} h-2/3 rounded-b-full`}></div>
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 150 }}
                dragElastic={0}
                dragMomentum={false}
                className={`absolute top-10 -left-3 w-8 h-5 ${color === 'primary' ? 'bg-primary border-primary' : 'bg-secondary border-secondary'} border shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded cursor-grab active:cursor-grabbing flex items-center justify-center`}
            >
                <div className="w-6 h-[1px] bg-black/50"></div>
            </motion.div>
        </div>
        <span className={`mt-4 text-[10px] font-mono font-bold ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}>{label}</span>
    </div>
);

export default function Lab() {
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-grid-line gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-surface rounded border border-grid-line">
                        <Activity className="text-secondary animate-pulse" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">THE SOUND LAB</h1>
                        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">System Ready v2.4.0 // MIDI: OFF</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 text-gray-400 hover:text-primary border border-grid-line rounded hover:border-primary transition-colors">
                        <Settings size={18} />
                    </button>
                    <button className="flex items-center gap-2 bg-surface border border-grid-line px-4 py-2 rounded text-xs font-bold uppercase tracking-wider text-secondary hover:bg-secondary hover:text-black transition-all">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Sidebar Controls */}
                <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
                    {/* LCD Display */}
                    <div className="bg-black border-2 border-grid-line rounded-lg p-6 relative overflow-hidden group h-32 flex items-center justify-center">
                        <div className="absolute top-2 right-2 text-primary/50 text-[10px] font-mono border border-primary/30 px-1 rounded">LCD-01</div>
                        <div className="text-center z-10">
                            <p className="text-[10px] text-gray-500 font-mono mb-1">LAST TRIGGERED</p>
                            <h3 className="text-2xl font-bold font-mono text-secondary tracking-widest">
                                {activePad ? PADS.find(p => p.id === activePad)?.label : 'READY...'}
                            </h3>
                        </div>
                        {/* Scanline overlay specific to LCD */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                    </div>

                    {/* Switches */}
                    <div className="bg-surface border border-grid-line rounded-xl p-6">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                            <Layers size={14} /> Environment Layers
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-mono text-gray-300">ENV: WAREHOUSE</label>
                                <button
                                    onClick={() => setEnvWarehouse(!envWarehouse)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${envWarehouse ? 'bg-primary' : 'bg-grid-line'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition-transform ${envWarehouse ? 'translate-x-5' : ''}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-mono text-gray-300">FX: VINYL</label>
                                <button className="w-10 h-5 rounded-full relative bg-grid-line">
                                    <div className="absolute top-1 left-1 w-3 h-3 bg-gray-500 rounded-full" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Faders */}
                    <div className="bg-surface border border-grid-line rounded-xl p-6 flex justify-around">
                        <Fader label="L" color="secondary" />
                        <Fader label="R" color="secondary" />
                        <Fader label="GAIN" color="primary" />
                    </div>
                </aside>

                {/* MPC Grid */}
                <div className="flex-grow bg-surface border-2 border-grid-line rounded-2xl p-8 relative shadow-2xl">
                    {/* Decoration */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-500">REC</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
                        {PADS.map((pad) => {
                            const IconComponent = ICON_MAP[pad.icon] || Music;
                            return (
                                <motion.button
                                    key={pad.id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => triggerPad(pad.id, pad.audioSrc)}
                                    className={`
                                relative group aspect-square rounded-lg border border-grid-line 
                                flex flex-col items-center justify-center gap-2
                                transition-all duration-100 overflow-hidden
                                ${activePad === pad.id
                                            ? `${pad.color === 'bg-primary' ? 'bg-primary border-primary shadow-[0_0_30px_rgba(234,255,0,0.4)]' : 'bg-secondary border-secondary shadow-[0_0_30px_rgba(0,229,229,0.4)]'}`
                                            : 'bg-surface-light hover:bg-surface-light/80 hover:border-gray-500'
                                        }
                            `}
                                >
                                    <span className={`absolute top-2 left-3 text-[10px] font-mono ${activePad === pad.id ? 'text-black' : 'text-gray-600'}`}>{pad.id}</span>
                                    <IconComponent
                                        size={32}
                                        className={`transition-colors ${activePad === pad.id ? 'text-black' : (pad.color === 'bg-primary' ? 'text-primary' : 'text-secondary')}`}
                                    />
                                    <span className={`text-xs font-bold tracking-widest ${activePad === pad.id ? 'text-black' : 'text-gray-300'}`}>{pad.label}</span>
                                </motion.button>
                            );
                        })}

                        {/* Empty slots for visual grid completion */}
                        {[...Array(8)].map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square rounded-lg border border-grid-line/30 bg-black/20 flex items-center justify-center opacity-50">
                                <div className="w-2 h-2 rounded-full bg-grid-line" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}