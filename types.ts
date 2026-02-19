import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string; // Link to video (YouTube, Vimeo, MP4, or Drive)
  audioSpec: string;
  featured?: boolean;
}

export interface SoundPad {
  id: string;
  label: string;
  key: string;
  color: string;
  icon: string; // Changed from LucideIcon to string for config file compatibility
  audioSrc?: string; // Added for audio playback
}