import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/marquee.css';

const MarqueeSection = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const totalWidth = marquee.scrollWidth / 2;

        gsap.to(marquee, {
            x: -totalWidth,
            duration: 15,
            repeat: -1,
            ease: 'none',
        });
    }, []);

    const items = [
        "WEB DESIGN", "DEVELOPMENT", "MOTION", "BRANDING", "3D DESIGN", "INTERACTION"
    ];

    return (
        <section className="marquee-strip-section">
            <div className="marquee-strip-wrapper" ref={marqueeRef}>
                {[...items, ...items].map((item, index) => (
                    <div className="marquee-strip-item" key={index}>
                        <h2 className="marquee-strip-text">{item}</h2>
                        <span className="marquee-strip-star">✦</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarqueeSection;
