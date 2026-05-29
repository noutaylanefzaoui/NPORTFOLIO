import React, { useState, useRef } from 'react';
import { Binary, Palette } from 'lucide-react';
import gsap from 'gsap';

const Experience = ({ experienceData }) => {
    const [activeTab, setActiveTab] = useState('it');
    const timelineRef = useRef(null);

    const handleTabChange = (tab) => {
        if (activeTab === tab) return;

        gsap.to(timelineRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
                setActiveTab(tab);
                gsap.fromTo(timelineRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
                );
            }
        });
    };

    const itExperience = experienceData?.it || [];
    const marketingExperience = experienceData?.marketing || [];

    return (
        <section id="experience" className="experience-section section-padding">
            <div className="container">
                <div className="experience-header-wrapper">
                    <div className="section-header">
                        <span className="subheading">Career Journey</span>
                        <h2 className="section-title">My Experience</h2>
                    </div>

                    {/* Split Focus Toggle */}
                    <div className="toggle-container">
                        <button 
                            className={`toggle-btn ${activeTab === 'it' ? 'active' : ''}`}
                            onClick={() => handleTabChange('it')}
                        >
                            <Binary className="btn-icon" size={15} /> Technical View
                        </button>
                        <button 
                            className={`toggle-btn ${activeTab === 'mkt' ? 'active' : ''}`}
                            onClick={() => handleTabChange('mkt')}
                        >
                            <Palette className="btn-icon" size={15} /> Marketing View
                        </button>
                    </div>
                </div>

                <div ref={timelineRef} className="timeline-container">
                    {activeTab === 'it' && itExperience.length === 0 ? (
                        <div className="timeline-empty-card" style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px dashed var(--border-color)',
                            borderRadius: 'var(--border-radius-md)',
                            padding: '40px',
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <p className="empty-title" style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: 'var(--text-primary)',
                                marginBottom: '10px'
                            }}>Beginning My Technical Journey</p>
                            <p className="empty-desc" style={{
                                fontSize: '14px',
                                fontWeight: '300',
                                lineHeight: '1.6'
                            }}>
                                My journey in professional IT is just beginning! Currently seeking summer internship opportunities to apply and grow my software development and database engineering skills.
                            </p>
                        </div>
                    ) : (
                        <div className="timeline">
                            {activeTab === 'it' ? (
                                itExperience.map((exp, idx) => (
                                    <div key={idx} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-date">{exp.date}</span>
                                            <h3>{exp.role}</h3>
                                            <h4 className="company">{exp.company}</h4>
                                            <p className="timeline-desc">{exp.desc}</p>
                                            <div className="timeline-tags">
                                                {exp.tags?.map((tag, i) => (
                                                    <span key={i}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                marketingExperience.map((exp, idx) => (
                                    <div key={idx} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-date">{exp.date}</span>
                                            <h3>{exp.role}</h3>
                                            <h4 className="company">{exp.company}</h4>
                                            <p className="timeline-desc">{exp.desc}</p>
                                            <div className="timeline-tags">
                                                {exp.tags?.map((tag, i) => (
                                                    <span key={i}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
