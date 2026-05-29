import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Scrollspy logic
            const sections = document.querySelectorAll('section');
            let current = 'hero';
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
        if (!drawerOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        setDrawerOpen(false);
        document.body.classList.remove('overflow-hidden');
        
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { label: 'About', id: 'about' },
        { label: 'Projects', id: 'projects' },
        { label: 'Experience', id: 'experience' },
        { label: 'Education', id: 'education' },
        { label: 'Contact', id: 'contact' }
    ];

    return (
        <>
            <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
                <div className="nav-container">
                    <a href="#hero" className="nav-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
                        Noutayla<span className="dot">.</span>
                    </a>
                    
                    {/* Desktop Menu */}
                    <nav className="nav-menu">
                        {navItems.map((item) => (
                            <a 
                                key={item.id}
                                href={`#${item.id}`} 
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="nav-actions">
                        {/* Theme Toggle Button */}
                        <button 
                            className="theme-toggle-btn" 
                            onClick={toggleTheme}
                            aria-label="Toggle light and dark theme"
                        >
                            {theme === 'dark' ? (
                                <Sun size={20} className="icon-sun" />
                            ) : (
                                <Moon size={20} className="icon-moon" />
                            )}
                        </button>

                        {/* Mobile Hamburger Menu Button */}
                        <button 
                            className={`hamburger ${drawerOpen ? 'open' : ''}`} 
                            onClick={toggleDrawer}
                            aria-label="Open navigation menu"
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer Menu */}
            <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
                <nav className="drawer-menu">
                    {navItems.map((item) => (
                        <a 
                            key={item.id}
                            href={`#${item.id}`} 
                            className="drawer-link"
                            onClick={(e) => handleLinkClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;
