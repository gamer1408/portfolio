import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/preloader.css';

const Preloader = () => {
    const preloaderRef = useRef(null);
    const iconRef = useRef(null);
    const counterRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Initial State
            gsap.set(iconRef.current, { scale: 0.8, opacity: 0, rotate: -10 });

            // 2. Animate icon in
            tl.to(iconRef.current, {
                scale: 1,
                opacity: 1,
                rotate: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.5
            });

            // 3. Counter count up (Subtle and integrated)
            let count = { value: 0 };
            tl.to(count, {
                value: 100,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = Math.floor(count.value);
                    }
                }
            }, "-=0.5");

            // 4. Move icon up and fade out
            tl.to(iconRef.current, {
                y: -30,
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                ease: "power2.in",
                delay: 0.2
            });

            // 5. Elegant Slide Exit
            tl.to(preloaderRef.current, {
                y: "-100%",
                duration: 1.2,
                ease: "expo.inOut"
            });

            // 6. Cleanup visibility of entire container just in case
            tl.set(preloaderRef.current, { display: "none" });

        }, preloaderRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-content">
                <div className="preloader-icon-container" ref={iconRef}>
                    <svg className="preloader-icon" viewBox="0 0 50 50">
                        <path
                            className="icon-path"
                            d="M15 15 L25 25 L35 15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength="100"
                        />
                        <path
                            className="icon-path"
                            d="M25 25 L25 35"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength="100"
                        />
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            strokeDasharray="2 4"
                            opacity="0.3"
                        />
                    </svg>
                </div>
                <div className="preloader-status">
                    <span className="preloader-count" ref={counterRef}>0</span>
                    <span className="preloader-percent">%</span>
                </div>
            </div>
            <div className="preloader-overlay" ref={panelRef}></div>
        </div>
    );
};

export default Preloader;
