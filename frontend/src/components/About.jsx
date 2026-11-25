import React from 'react';
import { ArrowUpRight, Braces, Clapperboard, Compass, Sparkles } from 'lucide-react';

const About = ({ profileData, skillsData }) => {
    const skillGroups = [
        { label: 'Digital & Technology', icon: <Braces size={17} />, skills: skillsData?.it || ['Java', 'SQL', 'HTML/CSS/JS', 'C Language', 'Databases', 'REST APIs'] },
        { label: 'Marketing & Media', icon: <Clapperboard size={17} />, skills: skillsData?.marketing || ['SEO Basics', 'Video Editing', 'Content Creation', 'Graphic Design', 'Web Strategy', 'Data Analytics'] }
    ];

    return (
        <section id="about" className="about-section section-padding">
            <div className="container">
                <div className="section-eyebrow-row">
                    <span className="section-eyebrow"><span>01</span> A little context</span>
                    <span className="section-side-note">Curiosity is the common thread.</span>
                </div>

                <div className="about-layout">
                    <div className="about-manifesto">
                        <p className="subheading">Two disciplines, one point of view</p>
                        <h2 className="about-headline">I like finding<br />the <em>story</em> in the<br />system.</h2>
                        <div className="about-doodle" aria-hidden="true"><span>✳</span></div>
                    </div>
                    <div className="about-copy-column">
                        <div className="about-copy-marker"><Compass size={18} /><span>My point of view</span></div>
                        <p className="about-bio">
                            {profileData?.bio || "I'm Noutayla, a student at Tunis Business School, born and raised in Tunis. I've always been the kind of person who's drawn to both creative and analytical challenges."}
                        </p>
                        <p className="about-bio about-bio-secondary">
                            I move between the way a message lands and the way a product works—bringing care to the thinking, the making, and everything that connects the two.
                        </p>
                        <a className="inline-link" href="#experience">A little of what I’ve done <ArrowUpRight size={15} /></a>
                    </div>
                </div>

                <div className="discipline-strip">
                    <article className="discipline-card discipline-card-pink">
                        <span className="discipline-number">01 / MAKE</span>
                        <div className="discipline-icon"><Sparkles size={21} /></div>
                        <h3>Creative<br />communication</h3>
                        <p>Visual content, brand thinking and ideas shaped for the people they’re meant to reach.</p>
                    </article>
                    <article className="discipline-card discipline-card-dark">
                        <span className="discipline-number">02 / CONNECT</span>
                        <div className="discipline-icon"><Clapperboard size={21} /></div>
                        <h3>Stories in<br />motion</h3>
                        <p>From the first concept to filming, editing and sharing short-form video.</p>
                    </article>
                    <article className="discipline-card discipline-card-lilac">
                        <span className="discipline-number">03 / BUILD</span>
                        <div className="discipline-icon"><Braces size={21} /></div>
                        <h3>Curiosity<br />with structure</h3>
                        <p>A technical foundation that helps me see how digital experiences fit together.</p>
                    </article>
                </div>

                <div className="skills-area">
                    <div className="skills-intro">
                        <span className="section-eyebrow"><span>02</span> Tools in my kit</span>
                        <h3>Different tools.<br /><em>Shared curiosity.</em></h3>
                    </div>
                    <div className="skills-groups">
                        {skillGroups.map((group) => (
                            <div className="skills-group" key={group.label}>
                                <h4>{group.icon}{group.label}</h4>
                                <div className="skills-list">
                                    {group.skills.map((skill) => <span className="skill-badge" key={skill}>{skill}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
