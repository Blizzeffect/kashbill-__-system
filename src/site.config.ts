import data from './content/data.json';

export const siteConfig = {
    name: "KASHBILL",
    role: "AUDIO ARCHITECT // SONIC DESIGNER // MUSIC PRODUCER // COMPOSER",
    description: {
        en: "Cinematic Soundscapes & Industrial Audio Engineering designed for immersive environments. Specialized in high-fidelity reconstruction.",
        es: "Paisajes Sonoros Cinematográficos e Ingeniería de Audio Industrial diseñados para entornos inmersivos. Especializado en reconstrucción de alta fidelidad."
    },
    status: {
        label: "AUDIO_ENGINE",
        value: "ONLINE",
        color: "green" // 'green' | 'red' | 'yellow'
    },
    contact: {
        email: "contact@kashbill.audio", // Update this
        linkedin: "https://linkedin.com/in/kashbill", // Update this
        resume: "/resume.pdf" // Path to resume in public folder
    },
    bio: [
        {
            en: "Specializing in industrial soundscapes and high-fidelity audio reconstruction. Currently optimizing signal flows for next-gen hardware interfaces.",
            es: "Especializado en paisajes sonoros industriales y reconstrucción de audio de alta fidelidad. Actualmente optimizando flujos de señal para hardware de nueva generación."
        },
        {
            en: "My work explores the intersection of analog warmth and digital precision, creating immersive auditory environments for gaming, film, and interactive installations.",
            es: "Mi trabajo explora la intersección entre la calidez analógica y la precisión digital, creando entornos auditivos inmersivos para videojuegos, cine e instalaciones interactivas."
        },
        {
            en: "Over 6 years of experience in procedural audio generation and adaptive music systems.",
            es: "Más de 6 años de experiencia en generación de audio procedural y sistemas musicales adaptativos."
        }
    ],
    images: {
        // Replace with your actual image path, e.g., "/my-photo.jpg" 
        // If using a local file in public folder: "/assets/profile.jpg"
        bio: "/unnamed (3).jpg",
        logo: "/logo.svg"
    },
    home: {
        // For the glitch text effect, these are the 3 lines
        line1: "PRECISION",
        line2: "AUDIO",
        line3: "SYSTEMS"
    },
    stats: {
        cpuLoad: "12%",
        latency: "4.2ms",
        projects: "ARCHIVED"
    },
    projects: data.projects,
    lab: data.lab
};
