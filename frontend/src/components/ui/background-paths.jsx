'use client';

import React from 'react';
import { motion } from 'framer-motion';

function FloatingPaths({ position }) {
    const paths = Array.from({ length: 36 }, (_, index) => ({
        id: index,
        d: `M-${380 - index * 5 * position} -${189 + index * 6}C-${
            380 - index * 5 * position
        } -${189 + index * 6} -${312 - index * 5 * position} ${216 - index * 6} ${
            152 - index * 5 * position
        } ${343 - index * 6}C${616 - index * 5 * position} ${470 - index * 6} ${
            684 - index * 5 * position
        } ${875 - index * 6} ${684 - index * 5 * position} ${875 - index * 6}`,
        width: 0.5 + index * 0.03,
        opacity: 0.1 + index * 0.03,
        duration: 20 + (index % 8),
    }));

    return (
        <div className="background-paths-layer" aria-hidden="true">
            <svg className="background-paths-svg" viewBox="0 0 696 316" fill="none">
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={path.opacity}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

function BackgroundPaths() {
    return (
        <div className="background-paths" aria-hidden="true">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
}

export { BackgroundPaths };
