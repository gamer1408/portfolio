import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/preloader.css';

const Preloader = () => {
    const preloaderRef = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Initial State
            gsap.set(textRef.current, { y: 100, opacity: 0 });

            // 2. Animate text in
            tl.to(textRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
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

            // 4. Move text up slightly faster
            tl.to(textRef.current, {
                y: -20,
                opacity: 0,
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
                <div className="preloader-text-container">
                    <h2 className="preloader-brand" ref={textRef}>
                        YAHYOBEK <span className="preloader-dot">.</span>
                    </h2>
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
