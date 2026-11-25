import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';

const Hero = ({ data }) => {
    return (
        <>
            <section id="hero" className="hero-section">
                <div className="hero-orbit hero-orbit-one" aria-hidden="true"></div>
                <div className="hero-orbit hero-orbit-two" aria-hidden="true"></div>
                <div className="container hero-container">
                    <div className="hero-copy">
                        <div className="hero-kicker">
                            <span className="status-dot"></span>
                            <span>Portfolio / 2026</span>
                            <span className="hero-kicker-rule"></span>
                            <span>Tunis, Tunisia</span>
                        </div>
                        <p className="hero-greeting">Hello, I’m</p>
                        <h1 className="hero-title" aria-label={data?.name || 'Noutayla Nefzaoui'}>
                            <span>Noutayla</span>
                            <span className="hero-title-second">Nefzaoui<span className="hero-title-period">.</span></span>
                        </h1>
                        <div className="hero-positioning">
                            <span className="hero-positioning-line"></span>
                            <p>Making ideas <em>feel</em> as good as they work.</p>
                        </div>
                        <p className="hero-desc">
                            {data?.short_bio || 'Marketing, visual storytelling and technology — connected by curiosity and a good eye for the details.'}
                        </p>
                        <div className="hero-ctas">
                            <MagneticButton>
                                <a href="#projects" className="btn btn-primary">
                                    Explore selected work <ArrowDownRight size={16} />
                                </a>
                            </MagneticButton>
                            <a href="#contact" className="hero-text-link">
                                Let’s talk <ArrowUpRight size={15} />
                            </a>
                        </div>
                    </div>

                    <div className="hero-collage" role="img" aria-label="Graphic composition about creativity, media and technology">
                        <div className="collage-topline"><span>N.N. / 01</span><span>Creative × Technical</span></div>
                        <div className="collage-sun"></div>
                        <div className="collage-ribbon collage-ribbon-back">IDEAS INTO IMPACT</div>
                        <div className="collage-monogram">N<span>.</span></div>
                        <div className="collage-card collage-card-a">
                            <span className="collage-card-label">A LITTLE OF BOTH</span>
                            <span className="collage-card-words">Think<br />&nbsp;&nbsp;&nbsp;make<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;again.</span>
                        </div>
                        <div className="collage-card collage-card-b">
                            <span className="collage-play" aria-hidden="true"><span></span></span>
                            <span className="collage-card-label">STORY / STRATEGY / SYSTEM</span>
                        </div>
                        <div className="collage-ribbon collage-ribbon-front">CURIOUS BY DESIGN</div>
                        <span className="collage-stamp">EL<br />MOUROUJ<br /><small>36.72° N</small></span>
                        <span className="collage-side-note">CREATIVE PRACTICE / SINCE 2023</span>
                    </div>

                    <a className="scroll-cue" href="#about" aria-label="Scroll to about">
                        <span>Scroll to explore</span><ArrowDownRight size={16} />
                    </a>
                    <div className="hero-index">01 — 06</div>
                </div>
            </section>
            <div className="marquee-band" aria-label="Marketing, media, technology, repeat">
                <div className="marquee-track" aria-hidden="true">
                    {Array.from({ length: 4 }, (_, index) => (
                        <span key={index}>Marketing <i>✳</i> Media <i>✳</i> Technology <i>✳</i> Big ideas, thoughtful details <i>✳</i></span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Hero;
