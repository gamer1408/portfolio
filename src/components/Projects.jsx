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
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
        color: '#1a1a1a'
    },
    {
        title: 'MODERN ARTE',
        category: 'Motion Design',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
        color: '#2a2a2a'
    },
    {
        title: 'ZENITH',
        category: 'Brand Identity',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80',
        color: '#0e0e0e'
    },
    {
        title: 'LUMINA',
        category: 'Creative UI',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80',
        color: '#1e1e1e'
    }
];

const Projects = ({ view = 'stack' }) => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        // Clear previous ScrollTriggers to avoid conflicts
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
                            start: "top 12%",
                            pin: true,
                            pinSpacing: false,
                            endTrigger: containerRef.current,
                            end: "bottom bottom",
                            onEnter: () => {
                                if (i > 0) {
                                    gsap.to(cards[i - 1], {
                                        scale: 0.9,
                                        opacity: 0.3,
                                        duration: 0.8,
                                        filter: 'blur(10px)',
                                        ease: "power2.out"
                                    });
                                }
                            },
                            onLeaveBack: () => {
                                if (i > 0) {
                                    gsap.to(cards[i - 1], {
                                        scale: 1,
                                        opacity: 1,
                                        duration: 0.8,
                                        filter: 'blur(0px)',
                                        ease: "power2.out"
                                    });
                                }
                            }
                        });
                    }

                    // Parallax for image inside card
                    gsap.to(card.querySelector('.card-image img'), {
                        y: '-20%',
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
                    duration: 25,
                    repeat: -1,
                    ease: 'none'
                });
            }
        }, containerRef);

        // Magnetic Button Effect
        const handleMouseMove = (e) => {
            const btns = document.querySelectorAll('.view-btn');
            btns.forEach(btn => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                const distance = Math.sqrt(x * x + y * y);

                if (distance < 120) {
                    gsap.to(btn, {
                        x: x * 0.4,
                        y: y * 0.4,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                    gsap.to(btn.querySelector('span'), {
                        x: x * 0.2,
                        y: y * 0.2,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                } else {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
                    gsap.to(btn.querySelector('span'), { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
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
        <section className={`projects-section ${view}-view`} ref={containerRef} id="work">
            <div className="section-header">
                <span className="section-label">SELECTED WORKS</span>
                <span className="section-count">01 — {projects.length}</span>
            </div>

            <div className="projects-container">
                {projects.map((project, index) => (
                    <div className="project-card" key={index} style={{ backgroundColor: view === 'stack' ? project.color : 'transparent' }}>
                        <div className="card-info">
                            <div className="card-meta">
                                <span>{project.category}</span>
                                <span>{project.year}</span>
                            </div>
                            <h2 className="card-title">{project.title}</h2>
                            <div className="view-btn">
                                <span>VIEW CASE</span>
                            </div>
                        </div>
                        <div className="card-image">
                            <img src={project.image} alt={project.title} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
