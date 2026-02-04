import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/cursor.css';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: 'power3.out'
            });
        };

        const onMouseEnterLink = () => {
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 0.5,
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.3
            });
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', onMouseEnterLink);
            link.addEventListener('mouseleave', onMouseLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={cursorRef}></div>
            <div className="cursor-follower" ref={followerRef}></div>
        </>
    );
};

export default Cursor;
