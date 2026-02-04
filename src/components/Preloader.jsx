import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/preloader.css';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const counterRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 1. Counter animation (Faster, high-intensity)
            let count = { value: 0 };
            tl.to(count, {
                value: 100,
                duration: 1.6,
                ease: 'power2.inOut',
                onUpdate: () => {
                    if (counterRef.current) {
                        counterRef.current.textContent = Math.floor(count.value);
                    }
                }
            });

            // 2. Text slide up (Premium reveal)
            tl.fromTo(textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
                '-=1.2'
            );

            // 3. Exit animation (The Cinematic Reveal)
            tl.to(preloaderRef.current, {
                y: '-100%',
                duration: 1.4,
                ease: 'expo.inOut',
                delay: 0.2
            });

            // Optional: Staggered panels exit if we want more complexity
            // tl.to('.preloader-panel', { height: 0, stagger: 0.1, duration: 1, ease: 'expo.inOut' }, '-=0.8');

        }, preloaderRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="preloader-content">
                <div className="preloader-text-wrapper">
                    <p className="preloader-text" ref={textRef}>
                        YAHYOBEK UROZALIYEV
                    </p>
                </div>
                <div className="preloader-counter">
                    <span ref={counterRef}>0</span>
                    <span className="percent">%</span>
                </div>
            </div>
            {/* Background panels for architectural exit */}
            <div className="preloader-bg">
                <div className="preloader-panel"></div>
            </div>
        </div>
    );
};

export default Preloader;
