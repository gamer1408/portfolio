import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Monitor, ExternalLink } from 'lucide-react';
import '../styles/projects.css';

const projects = [
    {
        id: 'RS-0922',
        index: '01',
        title: 'Rekhchand',
        description: 'An editorial fashion platform exploring minimalism and whitespace architecture.',
        tech: 'NEXT JS • GSAP • WEBGL',
        url: 'https://www.rekhchandsahu.com/',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
        color: '#0D0D0D'
    },
    {
        id: 'RS-1123',
        index: '02',
        title: 'Zenith',
        description: 'A study in architectural symmetry and digital shadows for a Stockholm design firm.',
        tech: 'FORMA • SUPABASE • GSAP',
        url: 'https://roshan-sahu.com/',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80',
        color: '#101010'
    },
    {
        id: 'RS-0124',
        index: '03',
        title: 'Lumina',
        description: 'Interactive lighting experience that reactive to user environmental data.',
        tech: 'THREE JS • REACT • PHYSICS',
        url: 'https://roshan-sahu.com/',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80',
        color: '#080808'
    },
    {
        id: 'RS-0424',
        index: '04',
        title: 'Arte.m',
        description: 'Curated digital gallery showcasing high-resolution motion art pieces.',
        tech: 'REMIX • CLOUDINARY • GSAP',
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
        color: '#0E0E0E'
    }
];

const ProjectCard = ({ project, index, total }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);

    // Parallax Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 120, damping: 20 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    // Elements parallax
    const previewX = useTransform(mouseX, [-100, 100], [-8, 8]);
    const previewY = useTransform(mouseY, [-100, 100], [-6, 6]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const cardSpring = {
        type: "spring",
        stiffness: 120,
        damping: 14
    };

    return (
        <motion.div
            className="project-card-wrapper"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: index * 0.12
                }
            }}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div
                ref={cardRef}
                className="project-card-inner"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    backgroundColor: project.color
                }}
                transition={cardSpring}
                style={{ rotateX, rotateY }}
            >
                {/* Background Blur & Reaction */}
                <motion.div
                    className="card-backdrop-blur"
                    animate={{
                        opacity: isHovered ? 0.35 : 0,
                        backdropFilter: isHovered ? 'blur(8px)' : 'blur(0px)'
                    }}
                    transition={{ duration: 0.4 }}
                />

                {/* 1. Top-Left Circular Index */}
                <div className="card-index-overlay">
                    <div className="index-circle">
                        <span className="label">PROJECT</span>
                        <span className="value">{project.index} | 0{total}</span>
                    </div>
                </div>

                {/* 2. Top-Right Metadata */}
                <div className="card-meta-overlay">
                    <div className="meta-stack">
                        <span className="project-id">{project.id}</span>
                        <div className="divider"></div>
                        <span className="project-tech">{project.tech}</span>
                    </div>
                </div>

                {/* 3, 4, 5. Main Content Area */}
                <div className="card-main-content">
                    <motion.h2
                        className="card-title-display"
                        animate={{
                            opacity: isHovered ? 1 : 0.8,
                            y: isHovered ? 0 : 14
                        }}
                        transition={{ delay: 0.08, duration: 0.35 }}
                    >
                        {project.title}
                    </motion.h2>

                    <motion.p
                        className="card-description-text"
                        animate={{
                            opacity: isHovered ? 1 : 0.6,
                            y: isHovered ? 0 : 18
                        }}
                        transition={{ delay: 0.14, duration: 0.35 }}
                    >
                        {project.description}
                    </motion.p>

                    <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-visit-btn"
                        animate={{
                            opacity: isHovered ? 1 : 0.6,
                            y: isHovered ? 0 : 22
                        }}
                        transition={{ delay: 0.2, duration: 0.35 }}
                    >
                        <span>VISIT SITE</span>
                        <ArrowUpRight size={18} />
                    </motion.a>
                </div>

                {/* 7. Preview Window (Live Iframe Parallax) */}
                <motion.div
                    className="preview-window-container"
                    style={{ x: previewX, y: previewY }}
                >
                    <motion.div
                        className="preview-window-frame"
                        animate={{
                            scale: isHovered ? 1.12 : 1.05,
                            y: isHovered ? 0 : 6
                        }}
                        transition={cardSpring}
                    >
                        <div className="window-header">
                            <div className="dots">
                                <span /> <span /> <span />
                            </div>
                            <div className="address-bar">
                                <Monitor size={10} />
                                <span>{project.url}</span>
                            </div>
                        </div>

                        <div className="window-body">
                            {isHovered && window.innerWidth > 768 ? (
                                <iframe
                                    src={project.url}
                                    title={project.title}
                                    className="live-preview-frame"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="static-preview-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="image-overlay">
                                        <ExternalLink size={24} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Background Bloom (Radial Glow) */}
                <div className="card-radial-bloom"></div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <motion.section
            className="projects-horizontal-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.1
                }
            }}
            viewport={{ once: true }}
        >
            <div className="projects-scroll-container">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                        index={i}
                        total={projects.length}
                    />
                ))}
                {/* Spacer for horizontal scroll padding */}
                <div className="scroll-spacer"></div>
            </div>
        </motion.section>
    );
};

export default Projects;
