import React, { useState, useRef } from 'react';
import { Cpu, TrendingUp, Lock, Users, PlayCircle, Search } from 'lucide-react';
import gsap from 'gsap';

// Local SVG component for GitHub to bypass Lucide icon library restriction
const GithubIcon = ({ size = 20, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Projects = ({ projectsData }) => {
    const [activeTab, setActiveTab] = useState('it');
    const gridRef = useRef(null);

    // Dynamic icon selection for marketing results
    const getResultIcon = (iconName) => {
        switch (iconName) {
            case 'trending-up': return <TrendingUp size={12} />;
            case 'users': return <Users size={12} />;
            case 'play-circle': return <PlayCircle size={12} />;
            case 'search': return <Search size={12} />;
            default: return <TrendingUp size={12} />;
        }
    };

    const handleTabChange = (tab) => {
        if (activeTab === tab) return;

        // Transition animation using GSAP
        gsap.to(gridRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
                setActiveTab(tab);
                gsap.fromTo(gridRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
                );
            }
        });
    };

    const itProjects = projectsData?.it || [];
    const marketingProjects = projectsData?.marketing || [];

    return (
        <section id="projects" className="projects-section section-padding">
            <div className="container">
                <div className="projects-header-wrapper">
                    <div className="section-header">
                        <span className="subheading">My Creations</span>
                        <h2 className="section-title">Featured Works</h2>
                    </div>

                    {/* Split Focus Toggle */}
                    <div className="toggle-container">
                        <button 
                            className={`toggle-btn ${activeTab === 'it' ? 'active' : ''}`}
                            onClick={() => handleTabChange('it')}
                        >
                            <Cpu className="btn-icon" size={15} /> IT Projects
                        </button>
                        <button 
                            className={`toggle-btn ${activeTab === 'mkt' ? 'active' : ''}`}
                            onClick={() => handleTabChange('mkt')}
                        >
                            <TrendingUp className="btn-icon" size={15} /> Marketing Projects
                        </button>
                    </div>
                </div>

                {/* Dynamic Project Grid Container */}
                <div ref={gridRef} className="projects-container">
                    {activeTab === 'it' ? (
                        <div className="project-grid">
                            {itProjects.map((project, idx) => (
                                <div key={idx} className="project-card">
                                    <div className="project-card-header">
                                        <span className="project-tag">{project.tag}</span>
                                        {project.github ? (
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="project-github" 
                                                aria-label="GitHub Repository"
                                            >
                                                <GithubIcon size={20} />
                                            </a>
                                        ) : (
                                            <span className="project-github disabled" aria-label="Not available on GitHub">
                                                <Lock size={20} />
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.desc}</p>
                                    <div className="project-tech-stack">
                                        {project.tech?.map((t, i) => (
                                            <span key={i}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="project-grid">
                            {marketingProjects.map((project, idx) => (
                                <div key={idx} className="project-card">
                                    <div className="project-card-header">
                                        <span className="project-tag">{project.tag}</span>
                                        <span className="project-result">
                                            {getResultIcon(project.icon)} {project.result}
                                        </span>
                                    </div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.desc}</p>
                                    <div className="project-tech-stack">
                                        {project.tech?.map((t, i) => (
                                            <span key={i}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
