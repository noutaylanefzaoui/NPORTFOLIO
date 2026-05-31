import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MouseContext = createContext({ x: 0 });

function DockIcon({ href, label, icon }) {
    const ref = useRef(null);
    const mouse = useContext(MouseContext);
    const distance = useMotionValue(Number.POSITIVE_INFINITY);

    useEffect(() => {
        if (!ref.current || mouse.x === 0) {
            distance.set(Number.POSITIVE_INFINITY);
            return;
        }

        const iconRect = ref.current.getBoundingClientRect();
        const containerRect = ref.current.parentElement.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width / 2;
        const mouseXAbsolute = containerRect.left + mouse.x;

        distance.set(Math.abs(mouseXAbsolute - iconCenterX));
    }, [distance, mouse]);

    const size = useTransform(distance, [0, 120], [58, 42]);
    const springSize = useSpring(size, { mass: 0.1, stiffness: 170, damping: 14 });

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="magnetic-dock-icon"
            style={{ width: springSize, height: springSize }}
        >
            {icon}
        </motion.a>
    );
}

function MagneticDock({ items }) {
    const [position, setPosition] = useState({ x: 0 });

    const onMouseMove = (event) => {
        const { left } = event.currentTarget.getBoundingClientRect();
        setPosition({ x: event.clientX - left });
    };

    const onMouseLeave = () => {
        setPosition({ x: 0 });
    };

    return (
        <MouseContext.Provider value={position}>
            <div
                className="magnetic-dock"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            >
                {items.map((item) => (
                    <DockIcon key={item.label} {...item} />
                ))}
            </div>
        </MouseContext.Provider>
    );
}

export { MagneticDock };
