import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { apiUrl } from './api';
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
        bio: "I am an enthusiastic IT student at Tunis Business School with a strong interest in software development and digital systems. Comfortable working across Java, SQL, JavaScript, HTML/CSS, and C.",
        short_bio: "Bridging technical logic and creative vision. Specialized in software development and digital marketing strategies."
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
        it: [],
        marketing: [
            {
                role: "Marketing Manager & Social Media Manager",
                company: "SpeakDuo & @Remote",
                date: "2025 - 2026",
                desc: "Directed full branding and digital campaign workflows. Supervised cross-functional teams on content creation, organic social channels expansion, and audience messaging.",
                tags: ["Brand Strategy", "Social Media Strategy"]
            },
            {
                role: "Marketing Intern",
                company: "Malla Marketing Agency",
                date: "2026",
                desc: "Contributed to active client campaigns, supported content layout writing, and performed organic research for diverse client portfolios.",
                tags: ["Content Marketing", "Client Relations"]
            },
            {
                role: "Marketing Assistant Intern",
                company: "SpeakDuo & @Remote",
                date: "2024 - 2025",
                desc: "Assisted with content writing and scheduled organic postings. Tracked customer engagement rates across social platforms to adjust layout trends.",
                tags: ["Content Creation", "Copywriting"]
            },
            {
                role: "Co-founder & Videographer",
                company: "C213",
                date: "2023 - 2025",
                desc: "Co-founded a dynamic creative project handling commercial videography, graphic layout, and brand storytelling for local enterprises.",
                tags: ["Videography", "Creative Direction"]
            },
            {
                role: "Marketing Intern",
                company: "TED University",
                date: "2025",
                desc: "Designed and printed communication materials, promoting high-profile university speaker events and managing speaker outreach networks.",
                tags: ["Event Marketing", "Speaker Promotion"]
            }
        ]
    },
    education: [
        {
            degree: "B.Sc. Business Administration",
            school: "Tunis Business School",
            date: "2023 – 2027 (in progress)",
            focus: "IT Major",
            desc: "Focusing on secure programming systems and corporate marketing frameworks. Selected coursework: Web Applications development, relational databases (SQL), procedural logic (C), and object-oriented systems (Java)."
        },
        {
            degree: "Baccalaureate",
            school: "High School Al Athar",
            date: "2019 – 2023",
            focus: "Experimental Sciences",
            desc: "Rigorous training in foundational logic, mathematics, physics, and biological sciences, graduating with strong analytical skills."
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
    const [theme, setTheme] = useState('dark');
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    
    const glowRef = useRef(null);

    // 1. Theme and Loading Setup
    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme === 'light' ? 'light-mode' : 'dark-mode';
        } else {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            const initialTheme = prefersLight ? 'light' : 'dark';
            setTheme(initialTheme);
            document.body.className = initialTheme === 'light' ? 'light-mode' : 'dark-mode';
        }

        // Fetch dynamic portfolio JSON data
        const fetchPortfolioData = async () => {
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
        document.body.className = newTheme === 'light' ? 'light-mode' : 'dark-mode';
    };

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // 3. GSAP Scrolling Entrance Reveals
    const initGSAPAnimations = () => {
        // Wait slightly for components rendering
        setTimeout(() => {
            const tl = gsap.timeline();
            tl.from(".hero-greeting", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
              .from(".hero-title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.4")
              .from(".hero-subtitle-container", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.5")
              .from(".hero-desc", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
              .from(".hero-ctas", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
              .from(".scroll-down", { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" }, "-=0.2");
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
                <Projects projectsData={portfolioData?.projects} />
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
