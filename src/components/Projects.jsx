import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'REKHCHAND',
        category: 'Design & Development',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
        color: '#1a1a1a'
    },
    {
        title: 'MODERN ARTE',
        category: 'Motion Design',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop',
        color: '#2a2a2a'
    },
    {
        title: 'ZENITH',
        category: 'Brand Identity',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop',
        color: '#0e0e0e'
    },
    {
        title: 'LUMINA',
        category: 'Creative UI',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop',
        color: '#1e1e1e'
    }
];

const Projects = ({ view }) => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        // Clear previous ScrollTriggers to avoid conflicts when switching views
        ScrollTrigger.getAll().forEach(t => {
            if (t.vars.trigger && (t.vars.trigger === containerRef.current || String(t.vars.trigger).includes('project-card'))) {
                t.kill();
            }
        });

        const ctx = gsap.context(() => {
            if (view === 'stack') {
                const cards = gsap.utils.toArray('.project-card');

                cards.forEach((card, i) => {
                    if (window.innerWidth > 768) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 10%',
                            pin: true,
                            pinSpacing: false,
                            endTrigger: containerRef.current,
                            end: 'bottom bottom',
                            onEnter: () => {
                                if (i > 0) {
                                    gsap.to(cards[i - 1], {
                                        scale: 0.9,
                                        opacity: 0.3,
                                        duration: 0.6,
                                        filter: 'blur(10px)',
                                        ease: 'power2.out'
                                    });
                                }
                            },
                            onLeaveBack: () => {
                                if (i > 0) {
                                    gsap.to(cards[i - 1], {
                                        scale: 1,
                                        opacity: 1,
                                        duration: 0.6,
                                        filter: 'blur(0px)',
                                        ease: 'power2.out'
                                    });
                                }
                            }
                        });
                    }

                    // Parallax image
                    gsap.to(card.querySelector('.project-image img'), {
                        y: -150,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    });
                });
            }

            if (view === 'marquee') {
                const marquee = marqueeRef.current;
                const totalWidth = marquee.scrollWidth / 2;

                gsap.to(marquee, {
                    x: -totalWidth,
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [view]);

    if (view === 'marquee') {
        return (
            <section className="projects-marquee-section" ref={containerRef}>
                <div className="marquee-wrapper" ref={marqueeRef}>
                    {[...projects, ...projects].map((project, index) => (
                        <div className="marquee-item" key={index}>
                            <h2 className="marquee-title">{project.title}</h2>
                            <span className="marquee-dot">•</span>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={`projects-section ${view === 'grid' ? 'grid-view' : 'stack-view'}`} ref={containerRef} id="work">
            <div className="projects-header">
                <span className="section-label">SELECTED WORKS</span>
                <span className="section-count">{projects.length} — 01</span>
            </div>

            <div className="projects-container">
                {projects.map((project, index) => (
                    <div className="project-card" key={index} style={{ backgroundColor: view === 'stack' ? project.color : 'transparent' }}>
                        <div className="project-info">
                            <div className="project-title-wrapper">
                                <h2 className="project-title">{project.title}</h2>
                                <div className="project-meta">
                                    <span>{project.category}</span>
                                    <span>{project.year}</span>
                                </div>
                            </div>
                        </div>
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
