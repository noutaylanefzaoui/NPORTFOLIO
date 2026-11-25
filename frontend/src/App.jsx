import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { apiUrl, hasApiBackend } from './api';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Local fallback data to guarantee operation even if the REST API backend is offline
const FALLBACK_DATA = {
    profile: {
        name: "Noutayla Nefzaoui",
        email: "noutaylanefzaoui@gmail.com",
        phone: "+216 29 015 861",
        location: "El Mourouj, Tunis",
        nationality: "Tunisian",
        bio: "I'm Noutayla, a student at Tunis Business School, born and raised in Tunis. I've always been the kind of person who's drawn to both creative and analytical challenges.",
        short_bio: "Bridging technical logic and creative vision. Passionate about combining creativity and technology to develop innovative digital solutions."
    },
    skills: {
        it: ["Java", "SQL", "HTML/CSS/JS", "C Language", "Databases", "REST APIs"],
        marketing: ["SEO Basics", "Video Editing", "Content Creation", "Graphic Design", "Web Strategy"]
    },
    projects: {
        it: [
            {
                title: "Ransomware Simulator",
                tag: "University Project Java / Cybersecurity",
                desc: "Built a controlled ransomware simulation to understand file encryption mechanisms and attack patterns. Developed understanding of cybersecurity threats, encryption algorithms, and defensive strategies.",
                tech: ["Java", "Cryptography", "Cybersecurity"],
                github: "https://github.com/AzizFekih-exe/ransomware-simulator.git"
            },
            {
                title: "MeetWise",
                tag: "University Project Android / AI",
                desc: "Developed an AI-integrated mobile application for smart meeting management. Gained hands-on experience with Android development and integrating AI/ML APIs.",
                tech: ["Java", "Android Studio", "AI APIs"],
                github: "https://github.com/AzizFekih-exe/MeetWise-AI-Scheduler.git"
            },
            {
                title: "Jokes Tounsi REST API",
                tag: "University Project REST API / Backend",
                desc: "Designed and built a REST API serving Tunisian dialect jokes, handling HTTP requests and JSON responses. Applied backend development concepts: routing, endpoints, data modeling.",
                tech: ["Python", "REST API", "JSON"],
                github: "https://github.com/noutaylanefzaoui/jokes_TOUNSI.git"
            },
            {
                title: "Shein Fashion Assortment Dashboard",
                tag: "University Project Power BI / Data Analytics",
                desc: "Built an interactive Power BI dashboard analysing fashion product assortment and sales trends. Applied data visualisation, filtering, and business intelligence techniques.",
                tech: ["Power BI", "Data Analysis", "Excel"],
                github: "https://github.com/AzizFekih-exe/shein-fashion-assortment-bi.git"
            },
            {
                title: "Smart Home System",
                tag: "University Project Java / IoT",
                desc: "Developed a Java-based smart home simulation managing connected devices and automation logic. Applied OOP principles: inheritance, encapsulation, and event-driven design.",
                tech: ["Java OOP", "IoT Logic", "Design Patterns"],
                github: "https://github.com/noutaylanefzaoui"
            }
        ],
        marketing: [
            {
                title: "Market Entry Proposal: McDonald's Tunisia",
                tag: "Brand Positioning Strategy",
                desc: "Implementing a Local Consumer Culture Positioning Strategy through the 'McDo Régional' Happy Meal Series.",
                tech: ["Market Research", "Consumer Culture", "Positioning"],
                result: "Pitch Deck Ready",
                icon: "trending-up"
            },
            {
                title: "Power Cups Digital Strategy",
                tag: "Social Media Campaigns",
                desc: "Constructing and planning comprehensive social media and visual distribution strategies for organic brand growth.",
                tech: ["Digital Strategy", "Visual Creation", "Growth Mapping"],
                result: "Strategy Map Done",
                icon: "users"
            },
            {
                title: "Consumer Behavior analysis on BIWAI SHOPS",
                tag: "Consumer Insights",
                desc: "Analyzing real-world buyer interactions, profiling customer journeys, and proposing strategic indexing suggestions.",
                tech: ["Consumer Research", "Market Strategy", "Analytics"],
                result: "Actionable Analysis",
                icon: "search"
            }
        ]
    },
    experience: {
        it: [
            {
                role: "Unintended CTF",
                bullets: [
                    "Participated in Unintended CTF, solving GEOINT and IMINT challenges and capturing flags within a competitive timeframe"
                ],
                tags: ["GEOINT", "IMINT", "CTF"]
            }
        ],
        marketing: [
            {
                role: "Co-founder & Videographer",
                company: "C213",
                location: "El Mourouj 3",
                date: "2023 – 2024",
                bullets: [
                    "Co-founded a creative media project with two partners, building the brand identity from scratch",
                    "Grew an organic audience of 2,900+ followers (Instagram and TikTok) with 18.4K likes",
                    "Handled the full pipeline: concept, filming, video and graphic editing, distribution"
                ],
                tags: ["Brand Identity", "Videography", "Video & Graphic Editing", "Organic Growth"]
            },
            {
                role: "Marketing Assistant Intern | Marketing Manager",
                company: "SpeakDuo",
                location: "Remote",
                date: "2024 – 2026",
                bullets: [
                    "Promoted from intern to manager, running the social media of a language learning platform for 18+ months",
                    "Designed and produced visual content",
                    "Supported SEO and wrote copy for landing pages and email campaigns"
                ],
                tags: ["Social Media Management", "Visual Content", "SEO", "Copywriting"]
            },
            {
                role: "Marketing Intern",
                company: "TED University",
                location: "On-site",
                date: "2025",
                bullets: [
                    "Contributed to the UI/UX redesign of the Shift Up agency website",
                    "Ran competitor analysis on positioning and digital strategy",
                    "Helped plan and manage Google Ads campaigns (keyword research, campaign structure, performance monitoring)"
                ],
                tags: ["UI/UX Redesign", "Competitor Analysis", "Google Ads"]
            },
            {
                role: "Marketing Intern",
                company: "Malla Marketing Agency",
                location: "Hybrid",
                date: "2026",
                bullets: [
                    "Produced short videos for client campaigns, used on social media stories and in paid advertising",
                    "Prepared campaign reports and competitor analyses for client presentations"
                ],
                tags: ["Short-Form Video", "Paid Advertising", "Campaign Reporting"]
            },
            {
                role: "Marketing Intern",
                company: "Icon Train Smarter",
                location: "Remote",
                date: "2026",
                bullets: [
                    "Created social media content for an AI-powered fitness app",
                    "Adapted the tone and format of each post to the platform and audience"
                ],
                tags: ["Social Media Content", "AI Fitness", "Content Strategy"]
            },
            {
                role: "Business Development Intern",
                company: "Mobelite Tunisie",
                location: "On-site",
                date: "2026",
                bullets: [
                    "Built and enriched a database of 3,000+ verified B2B contacts using LinkedIn Sales Navigator and Hunter.io",
                    "Cleaned and structured the data so the sales team could use it for outreach",
                    "Identified and profiled target companies and decision-makers"
                ],
                tags: ["B2B Lead Gen", "Sales Navigator", "Hunter.io", "Data Enrichment"]
            },
            {
                role: "Content Creator",
                company: "",
                date: "Present",
                desc: "Create, edit and publish short-form videos on social media with a growing community",
                tags: ["Short-Form Video", "Video Editing", "Community Growth"]
            }
        ]
    },
    education: [
        {
            degree: "B.Sc. Business Administration",
            school: "Tunis Business School",
            date: "2023 – 2027 (in progress)",
            focus: "IT Major"
        },
        {
            degree: "Baccalaureate",
            school: "High School Al Athar",
            date: "2019 – 2023",
            focus: "Experimental Sciences"
        }
    ],
    extracurriculars: [
        {
            organization: "IEEE TBS Student Branch",
            role: "Marketing & Communication Member &bull; 2025 - 2026",
            desc: "Collaborated on marketing content and promoted technical events and workshops within the TBS community."
        },
        {
            organization: "TIMUN TBS (Model United Nations)",
            role: "Project Management & External Relations &bull; 2024 - 2025",
            desc: "Engaged in organizing large-scale simulated assemblies, managing sponsor outreach, logistics, and planning."
        },
        {
            organization: "MERIT TBS",
            role: "Marketing & Communication Member &bull; 2024 - 2025",
            desc: "Assisted in shaping public branding, social materials, and structural distribution for student initiatives."
        }
    ]
};

function App() {
    const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const glowRef = useRef(null);

    useEffect(() => {
        const sections = [...document.querySelectorAll('.section-padding')];
        if (!('IntersectionObserver' in window)) {
            sections.forEach((section) => section.classList.add('section-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.04, rootMargin: '0px 0px -36px 0px' });

        sections.forEach((section) => {
            section.classList.add('section-animated');
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // 1. Theme and Loading Setup
    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem('theme');
        const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
        setTheme(initialTheme);
        document.body.classList.toggle('light-mode', initialTheme === 'light');
        document.body.classList.toggle('dark-mode', initialTheme === 'dark');

        // Fetch dynamic portfolio JSON data
        const fetchPortfolioData = async () => {
            if (!hasApiBackend) {
                return;
            }

            try {
                const response = await fetch(apiUrl('/api/portfolio-data'));
                if (response.ok) {
                    const data = await response.json();
                    setPortfolioData(data);
                }
            } catch (err) {
                console.warn("Could not connect to backend REST API. Using pre-loaded backup CV structures.", err);
            }
        };
        fetchPortfolioData();

        // Simulated loader progression
        let count = 0;
        const loaderInterval = setInterval(() => {
            count += Math.floor(Math.random() * 15) + 5;
            if (count >= 100) {
                count = 100;
                clearInterval(loaderInterval);
                setTimeout(() => {
                    setLoading(false);
                    // Initialize GSAP scroll animations
                    initGSAPAnimations();
                }, 400);
            }
            setLoadProgress(count);
        }, 50);

        return () => clearInterval(loaderInterval);
    }, []);

    // 2. Cursor glow event & Scroll Listeners
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            // Update scroll progress bar width
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) progressBar.style.width = `${scrolled}%`;
        };

        if (window.matchMedia("(hover: hover)").matches) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('light-mode', newTheme === 'light');
        document.body.classList.toggle('dark-mode', newTheme === 'dark');
    };

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    };

    // 3. GSAP Scrolling Entrance Reveals
    const initGSAPAnimations = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        // Wait slightly for components rendering
        setTimeout(() => {
            const tl = gsap.timeline();
            tl.from(".hero-greeting", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
                .from(".hero-title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.4")
                .from(".hero-positioning", { opacity: 0, y: 15, duration: 0.55, ease: "power3.out" }, "-=0.5")
                .from(".hero-desc", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(".hero-ctas", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(".scroll-cue", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" }, "-=0.2");
        }, 100);
    };

    return (
        <>
            {/* 1. Page Loader */}
            {loading && (
                <div id="loader" className="loader-container">
                    <div className="loader-content">
                        <span className="loader-logo">N.N</span>
                        <div className="loader-bar">
                            <div className="loader-progress" style={{ width: `${loadProgress}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. Scroll Progress Indicator */}
            <div id="scroll-progress" className="scroll-progress-bar"></div>

            {/* 3. Custom Glow Element */}
            <div ref={glowRef} className="cursor-glow" id="cursor-glow"></div>

            {/* 4. Assembled Layout */}
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero data={portfolioData?.profile} />
                <About profileData={portfolioData?.profile} skillsData={portfolioData?.skills} />
                <Projects projectsData={portfolioData?.projects} marketingExperience={portfolioData?.experience?.marketing} />
                <Experience experienceData={portfolioData?.experience} />
                <Education educationData={portfolioData?.education} extracurricularsData={portfolioData?.extracurriculars} />
                <Contact profileData={portfolioData?.profile} />
            </main>
            <Footer />

            {/* 5. Back to Top Button */}
            <button
                className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
                onClick={handleBackToTop}
                aria-label="Back to top"
            >
                <ArrowUp size={20} />
            </button>
        </>
    );
}

export default App;
