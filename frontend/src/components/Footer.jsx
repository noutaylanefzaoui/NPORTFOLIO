import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <p>&copy; {new Date().getFullYear()} Noutayla Nefzaoui. All rights reserved.</p>
                <p className="designed-by">Designed with elegance & simplicity.</p>
            </div>
        </footer>
    );
};

export default Footer;
