import React, { useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Clapperboard, Code2, Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const GithubIcon = ({ size = 17 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5 0 0-1 0-3 1.5a13.38 13.38 0 0 0-8 0C5 5 4 5 4 5c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 3 12c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v1" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const Projects = ({ projectsData, marketingExperience = [] }) => {
    const [activeTab, setActiveTab] = useState('mkt');
    const gridRef = useRef(null);
    const marketingProjects = projectsData?.marketing || [];
    const itProjects = projectsData?.it || [];
    const activeProjects = activeTab === 'mkt' ? marketingProjects : itProjects;
    const creativeWork = marketingExperience.find((item) => item.company === 'C213');
    const audienceMetrics = creativeWork?.bullets?.find((bullet) => bullet.includes('followers'))?.match(/2,900\+|18\.4K/g) || ['2,900+', '18.4K'];

    const handleTabChange = (tab) => {
        if (activeTab === tab) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setActiveTab(tab);
            return;
        }
        gsap.to(gridRef.current, {
            opacity: 0,
            y: -8,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                setActiveTab(tab);
                gsap.fromTo(gridRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
            }
        });
    };

    return (
        <section id="projects" className="projects-section section-padding">
            <div className="container">
                <div className="section-eyebrow-row">
                    <span className="section-eyebrow"><span>03</span> Work, in progress</span>
                    <span className="section-side-note">A selection of things I’ve thought through and made.</span>
                </div>
                <div className="projects-heading-row">
                    <div className="section-header">
                        <p className="subheading">A considered little collection</p>
                        <h2 className="section-title">Selected<br /><em>work</em><span className="title-star">✳</span></h2>
                    </div>
                    <div className="projects-intro">
                        <p>From social-first storytelling to digital strategy and technical experiments, each piece starts with a question worth exploring.</p>
                        <div className="project-switch" role="group" aria-label="Choose a portfolio category">
                            <button type="button" className={activeTab === 'mkt' ? 'active' : ''} aria-pressed={activeTab === 'mkt'} onClick={() => handleTabChange('mkt')}>
                                <Clapperboard size={15} /> Creative & marketing
                            </button>
                            <button type="button" className={activeTab === 'it' ? 'active' : ''} aria-pressed={activeTab === 'it'} onClick={() => handleTabChange('it')}>
                                <Code2 size={15} /> Technical
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === 'mkt' && (
                    <article className="creative-spotlight">
                        <div className="spotlight-poster" role="img" aria-label="Graphic poster for the C213 creative media project">
                            <div className="spotlight-poster-top"><span>C213 / SOCIAL STORYTELLING</span><span>2023—24</span></div>
                            <div className="spotlight-shape spotlight-shape-a"></div>
                            <div className="spotlight-shape spotlight-shape-b"></div>
                            <span className="spotlight-word">MAKE<br /><em>it move.</em></span>
                            <div className="spotlight-sticker"><Play size={17} fill="currentColor" /><span>IDEA<br />TO FEED</span></div>
                            <span className="spotlight-poster-foot">FILM / EDIT / SHARE <i>✳</i> EL MOUROUJ 3</span>
                        </div>
                        <div className="spotlight-copy">
                            <span className="spotlight-label"><Sparkles size={15} /> Creative work / C213</span>
                            <h3>Making a small idea<br />find its <em>people.</em></h3>
                            <p>{creativeWork?.bullets?.[0] || 'Co-founded a creative media project, shaping it from early brand decisions through filming, editing and distribution.'} {creativeWork?.bullets?.[2] || ''}</p>
                            <div className="spotlight-stats">
                                <div><strong>{audienceMetrics[0] || '2,900+'}</strong><small>organic followers</small></div>
                                <div><strong>{audienceMetrics[1] || '18.4K'}</strong><small>likes</small></div>
                            </div>
                            <a href="#experience" className="inline-link">Read the experience <ArrowUpRight size={15} /></a>
                        </div>
                    </article>
                )}

                <div className="work-grid" ref={gridRef}>
                    {activeProjects.map((project, index) => (
                        <article className={`work-card work-card-${index % 4}`} key={`${activeTab}-${project.title}`}>
                            <div className={`work-artwork work-artwork-${index % 4}`} role="img" aria-label={`Decorative poster-style title graphic for ${project.title}`}>
                                <div className="artwork-frame-line"></div>
                                <div className="artwork-topline"><span>{activeTab === 'mkt' ? 'FIELD NOTES / MARKETING' : 'LAB NOTES / TECHNOLOGY'}</span><span>0{index + 1}</span></div>
                                <div className="artwork-sun"></div>
                                <span className="artwork-motif" aria-hidden="true">{activeTab === 'mkt' ? ['✳', '◒', '✳', '◌'][index % 4] : ['{}', '01', '↗', '⌘'][index % 4]}</span>
                                <span className="artwork-title">{project.title}</span>
                                <span className="artwork-subtitle">{project.tag}</span>
                                <div className="artwork-bottomline"><span>{activeTab === 'mkt' ? 'CONCEPT / CULTURE / CONNECTION' : (project.tech || []).slice(0, 3).join('  /  ')}</span><span>↗</span></div>
                            </div>
                            <div className="work-card-body">
                                <div className="work-card-meta"><span>{project.tag}</span><span className="work-card-number">0{index + 1} / 0{activeProjects.length}</span></div>
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                                <div className="work-card-bottom">
                                    <div className="work-tags">
                                        {project.tech?.map((item) => <span key={item}>{item}</span>)}
                                    </div>
                                    {activeTab === 'it' && project.github && (
                                        <a className="work-github" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} on GitHub`}>
                                            <GithubIcon /><ArrowUpRight size={14} />
                                        </a>
                                    )}
                                    {activeTab === 'mkt' && project.result && <span className="work-result"><ArrowDownRight size={14} />{project.result}</span>}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                <div className="projects-footnote"><span className="footnote-flower">✳</span><p>More experiments, drafts and ideas are always in the making.</p><span className="footnote-rule"></span></div>
            </div>
        </section>
    );
};

export default Projects;
