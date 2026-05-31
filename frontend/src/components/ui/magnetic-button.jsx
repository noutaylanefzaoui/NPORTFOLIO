'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

function MagneticButton({ children, distance = 0.6 }) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);

    useEffect(() => {
        const calculateDistance = (event) => {
            if (!ref.current) {
                return;
            }

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = event.clientX - centerX;
            const distanceY = event.clientY - centerY;

            if (isHovered) {
                x.set(distanceX * distance);
                y.set(distanceY * distance);
                return;
            }

            x.set(0);
            y.set(0);
        };

        document.addEventListener('mousemove', calculateDistance);

        return () => {
            document.removeEventListener('mousemove', calculateDistance);
        };
    }, [distance, isHovered, x, y]);

    return (
        <motion.div
            className="magnetic-button"
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                x: springX,
                y: springY,
                display: 'inline-flex',
            }}
        >
            {children}
        </motion.div>
    );
}

export { MagneticButton };
