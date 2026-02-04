import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const headlineRef = useRef(null);
    const subtextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Split text reveal effect
            const lines = headlineRef.current.querySelectorAll('.line-inner');

            gsap.fromTo(lines,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 3.2 // Wait for preloader to almost finish
                }
            );

            // Subtext fade in
            gsap.fromTo(subtextRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 3.8
                }
            );

            // Parallax on scroll
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 200,
                opacity: 0,
                scale: 0.95
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={containerRef}>
            <div className="hero-content">
                <h1 className="hero-headline" ref={headlineRef}>
                    <div className="line">
                        <span className="line-inner">YAHYOBEK</span>
                    </div>
                    <div className="line">
                        <span className="line-inner">UROZALIYEV</span>
                    </div>
                </h1>

                <div className="hero-subtext-container" ref={subtextRef}>
                    <p className="hero-description">
                        Creative Web Developer <br />
                        based in Bengaluru, India.
                    </p>
                    <div className="hero-tags">
                        <span>FREELANCE</span>
                        <span>2024</span>
                    </div>
                </div>
            </div>

            <div className="hero-footer">
                <div className="scroll-indicator">
                    <span>SCROLL DOWN</span>
                    <div className="arrow"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
