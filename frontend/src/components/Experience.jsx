import React, { useRef, useState } from 'react';
import { ArrowDownRight, Binary, Palette } from 'lucide-react';
import gsap from 'gsap';

const Experience = ({ experienceData }) => {
    const [activeTab, setActiveTab] = useState('mkt');
    const timelineRef = useRef(null);
    const itExperience = experienceData?.it || [];
    const marketingExperience = experienceData?.marketing || [];
    const activeExperience = activeTab === 'it' ? itExperience : marketingExperience;

    const handleTabChange = (tab) => {
        if (activeTab === tab) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setActiveTab(tab);
            return;
        }
        gsap.to(timelineRef.current, {
            opacity: 0,
            y: -6,
            duration: 0.18,
            ease: 'power2.out',
            onComplete: () => {
                setActiveTab(tab);
                gsap.fromTo(timelineRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
            }
        });
    };

    return (
        <section id="experience" className="experience-section section-padding">
            <div className="container">
                <div className="section-eyebrow-row">
                    <span className="section-eyebrow"><span>04</span> The things I’ve learned by doing</span>
                    <span className="section-side-note">A timeline, with a few different threads.</span>
                </div>
                <div className="experience-heading-row">
                    <div className="section-header">
                        <p className="subheading">Practice makes perspective</p>
                        <h2 className="section-title">Out in the<br /><em>world.</em></h2>
                    </div>
                    <div className="experience-controls">
                        <p>Different environments, shared instinct: notice what matters, then make it clearer.</p>
                        <div className="project-switch" role="group" aria-label="Choose an experience view">
                            <button type="button" className={activeTab === 'mkt' ? 'active' : ''} aria-pressed={activeTab === 'mkt'} onClick={() => handleTabChange('mkt')}>
                                <Palette size={15} /> Marketing
                            </button>
                            <button type="button" className={activeTab === 'it' ? 'active' : ''} aria-pressed={activeTab === 'it'} onClick={() => handleTabChange('it')}>
                                <Binary size={15} /> Technical
                            </button>
                        </div>
                    </div>
                </div>

                <div className="experience-list" ref={timelineRef}>
                    {activeExperience.map((item, index) => (
                        <article className="experience-row" key={`${activeTab}-${item.role}-${item.company || index}`}>
                            <div className="experience-row-index"><span>0{index + 1}</span><span className="experience-row-line"></span></div>
                            <div className="experience-row-main">
                                <div className="experience-row-heading">
                                    <div>
                                        {item.company && <span className="experience-company">{item.company}</span>}
                                        <h3>{item.role}</h3>
                                    </div>
                                    {item.date && <span className="experience-date">{item.date}</span>}
                                </div>
                                {item.location && <span className="experience-location">{item.location}</span>}
                                {item.bullets?.length > 0 ? (
                                    <ul className="experience-bullets">
                                        {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                                    </ul>
                                ) : item.desc ? <p className="experience-desc">{item.desc}</p> : null}
                                {item.tags?.length > 0 && <div className="experience-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
                            </div>
                            <span className="experience-row-arrow" aria-hidden="true"><ArrowDownRight size={19} /></span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
