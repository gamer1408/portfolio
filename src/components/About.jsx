import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal the description text as user scrolls
            const chars = textRef.current.querySelectorAll('.about-char');

            gsap.fromTo(chars,
                { color: 'rgba(255, 255, 255, 1)' },
                {
                    color: 'rgba(255, 255, 255, 1)',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: 'top 80%',
                        end: 'bottom 40%',
                        scrub: true,
                    }
                }
            );

            // Parallax for the small caption
            gsap.to('.about-caption', {
                y: -50,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const description = "I'm Yahyobek Urozaliyev, a creative web developer focused on building functional, high-end digital experiences. I combine design thinking with performance-driven code to bridge the gap between aesthetics and technology.";

    return (
        <section className="about-section" ref={sectionRef} id="about">
            <div className="about-container">
                <div className="about-left">
                    <span className="about-caption">WHO I AM</span>
                </div>
                <div className="about-right">
                    <p className="about-text" ref={textRef}>
                        {description.split(' ').map((word, i) => (
                            <span key={i} className="about-word">
                                {word.split('').map((char, j) => (
                                    <span key={j} className="about-char">{char}</span>
                                ))}
                                &nbsp;
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
