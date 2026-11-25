import React from 'react';

const Footer = () => (
    <footer className="footer">
        <div className="container footer-container">
            <a className="footer-signoff" href="#hero">Noutayla<span>.</span></a>
            <p>© {new Date().getFullYear()} Noutayla Nefzaoui <i>·</i> Tunis, Tunisia</p>
        </div>
    </footer>
);

export default Footer;
