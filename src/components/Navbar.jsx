import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/navbar.css';

const Navbar = () => {
    const [time, setTime] = useState(new Date());
    const navRef = useRef(null);

    useEffect(() => {
        // Clock logic
        const timer = setInterval(() => setTime(new Date()), 1000);

        // Entrance animation
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 3.1 }
        );

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).toUpperCase();
    };

    return (
        <nav className="navbar" ref={navRef}>
            <div className="nav-container">
                <div className="nav-logo">
                    <a href="/">YAHYOBEK UROZALIYEV</a>
                </div>

                <div className="nav-time">
                    <span>LOCAL TIME — {formatTime(time)}</span>
                </div>

                <div className="nav-links">
                    <a href="#work" className="nav-link">WORK</a>
                    <a href="#about" className="nav-link">ABOUT</a>
                    <a href="#contact" className="nav-link">CONTACT</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
