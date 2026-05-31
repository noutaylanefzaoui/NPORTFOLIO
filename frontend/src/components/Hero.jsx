import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const Hero = ({ data }) => {
    const rotatingTextRef = useRef(null);

    useEffect(() => {
        if (!rotatingTextRef.current) return;

        const roles = ["IT Major", "Marketing Minor"];
        let roleIndex = 0;

        const rotate = () => {
            gsap.to(rotatingTextRef.current, {
                opacity: 0,
                y: -15,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    roleIndex = (roleIndex + 1) % roles.length;
                    if (rotatingTextRef.current) {
                        rotatingTextRef.current.textContent = roles[roleIndex];
                        gsap.fromTo(rotatingTextRef.current, 
                            { opacity: 0, y: 15 },
                            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                        );
                    }
                }
            });
        };

        const interval = setInterval(rotate, 4500);
        return () => clearInterval(interval);
    }, []);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="hero" class="hero-section">
            <div className="hero-bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>
            <div className="container hero-container">
                <span className="hero-greeting">Hello, I'm</span>
                <h1 className="hero-title">{data?.name || "Noutayla Nefzaoui"}</h1>
                
                {/* Rotating Subtitle */}
                <div className="hero-subtitle-container">
                    <span className="hero-subtitle" ref={rotatingTextRef}>IT Major</span>
                </div>
                
                <p className="hero-desc">
                    {data?.short_bio || "Bridging technical logic and creative vision. Passionate about combining creativity and technology to develop innovative digital solutions."}
                </p>

                <div className="hero-ctas">
                    <a href="#projects" className="btn btn-primary" onClick={(e) => handleScrollTo(e, 'projects')}>
                        View Projects
                    </a>
                    <a href="#contact" className="btn btn-secondary" onClick={(e) => handleScrollTo(e, 'contact')}>
                        Contact Me
                    </a>
                </div>

                <div className="scroll-down" onClick={(e) => handleScrollTo(e, 'about')}>
                    <span className="scroll-text">Scroll Down</span>
                    <ChevronDown className="scroll-icon" size={16} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
