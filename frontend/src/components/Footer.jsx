import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer = () => (
    <footer className="footer">
        <div className="container footer-container">
            <a className="footer-signoff" href="#hero">Noutayla<span>.</span></a>
            <p>© {new Date().getFullYear()} Noutayla Nefzaoui <i>·</i> Tunis, Tunisia</p>
            <a className="footer-top-link" href="#hero">Back to the top <ArrowUpRight size={14} /></a>
        </div>
    </footer>
);

export default Footer;
