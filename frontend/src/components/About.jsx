import React from 'react';
import { Code, Sparkles, Terminal, Megaphone, Check } from 'lucide-react';

const About = ({ profileData, skillsData }) => {
    return (
        <section id="about" className="about-section section-padding">
            <div className="container">
                <div className="section-header">
                    <span className="subheading">Get To Know Me</span>
                    <h2 className="section-title">Bridging Two Worlds</h2>
                </div>

                <div className="about-grid">
                    <div className="about-bio-card">
                        <h3 className="card-title-main">My Story</h3>
                        <p className="bio-text">
                            {profileData?.bio || 
                            "I'm Noutayla, a student at Tunis Business School, born and raised in Tunis. I've always been the kind of person who's drawn to both creative and analytical challenges."}
                        </p>
                        <div className="strengths-container">
                            <span className="strength-tag">
                                <Check className="check-icon" size={14} /> Analytical Logic
                            </span>
                            <span className="strength-tag">
                                <Check className="check-icon" size={14} /> Visual Storytelling
                            </span>
                            <span className="strength-tag">
                                <Check className="check-icon" size={14} /> Rapid Adaptation
                            </span>
                        </div>
                    </div>

                    <div className="about-meta-grid">
                        <div className="meta-card">
                            <div className="card-icon-wrapper">
                                <Code className="meta-icon" size={20} />
                            </div>
                            <h3>IT Focus</h3>
                            <p>Building clean and robust backend systems, databases, and procedural programs.</p>
                        </div>
                        <div className="meta-card">
                            <div className="card-icon-wrapper">
                                <Sparkles className="meta-icon" size={20} />
                            </div>
                            <h3>Marketing Focus</h3>
                            <p>Crafting SEO strategies, content creation, social media growth, and videography.</p>
                        </div>
                    </div>
                </div>

                {/* Skills Sub-section */}
                <div className="skills-wrapper">
                    <h3 className="skills-title">Skills & Technologies</h3>
                    <div className="skills-grid">
                        <div className="skills-col">
                            <h4 className="col-title">
                                <Terminal className="col-icon" size={18} /> IT & Coding
                            </h4>
                            <div className="skills-list">
                                {(skillsData?.it || ["Java", "SQL", "HTML/CSS/JS", "C Language", "Databases", "REST APIs"]).map((skill, idx) => (
                                    <div key={idx} className="skill-badge">{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div className="skills-col">
                            <h4 className="col-title">
                                <Megaphone className="col-icon" size={18} /> Marketing & Media
                            </h4>
                            <div className="skills-list">
                                {(skillsData?.marketing || ["SEO Basics", "Video Editing", "Content Creation", "Graphic Design", "Web Strategy", "Data Analytics"]).map((skill, idx) => (
                                    <div key={idx} className="skill-badge">{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
