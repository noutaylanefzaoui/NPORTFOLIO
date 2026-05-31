import React, { useState } from 'react';
import { Mail, Phone, MapPin, DownloadCloud, Send, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiUrl, useNetlifyForms } from '../api';

const NETLIFY_FORM_POST_PATH = '/';
const NETLIFY_FORM_SUCCESS_PATH = '/success.html';

// Local SVG component for GitHub to bypass Lucide icon library restriction
const GithubIcon = ({ size = 18, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

// Local SVG component for LinkedIn to bypass Lucide icon library restriction
const LinkedinIcon = ({ size = 18, ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const Contact = ({ profileData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast(null);
        }, 4000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitNetlifyForm = async () => {
        const encodedData = new URLSearchParams({
            'form-name': 'contact',
            'bot-field': '',
            ...formData
        });

        const response = await fetch(NETLIFY_FORM_POST_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodedData.toString()
        });

        if (!response.ok) {
            throw new Error(`Netlify form submission failed (${response.status}).`);
        }
    };

    const submitApiForm = async () => {
        const response = await fetch(apiUrl('/api/contact'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong. Please check your fields.');
        }

        return result.message;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let successMessage = 'Thank you! Your message has been received.';

            if (useNetlifyForms) {
                await submitNetlifyForm();
            } else {
                successMessage = await submitApiForm();
            }

            showToast(successMessage, 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#f8c8dc', '#db4c7c', '#ffffff']
            });
        } catch (error) {
            console.error('Submission error:', error);
            showToast(error.message || 'Failed to submit form. Please verify server connection.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section section-padding">
            <div className="container">
                <div className="section-header">
                    <span className="subheading">Get In Touch</span>
                    <h2 className="section-title">Let's Connect</h2>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info-card">
                        <h3>Drop Me a Line</h3>
                        <p className="contact-subtitle">
                            Interested in collaborating on a digital build or a campaign? Feel free to reach out. I am open to summer internship opportunities.
                        </p>

                        <div className="contact-details">
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <span>Email</span>
                                    <a href={`mailto:${profileData?.email || "noutaylanefzaoui@gmail.com"}`}>
                                        {profileData?.email || "noutaylanefzaoui@gmail.com"}
                                    </a>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span>Phone</span>
                                    <a href={`tel:${profileData?.phone?.replace(/\s+/g, '') || "+21629015861"}`}>
                                        {profileData?.phone || "+216 29 015 861"}
                                    </a>
                                </div>
                            </div>
                            <div className="detail-item">
                                <div className="detail-icon">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <span>Location</span>
                                    <p>{profileData?.location || "El Mourouj, Tunis, Tunisia"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Resumes Download */}
                        <div className="resumes-download-box">
                            <h4>Download Resumes</h4>
                            <div className="download-btns">
                                <a href="/docs/CV_Noutayla_IT.pdf" download className="btn btn-download">
                                    <DownloadCloud size={16} /> IT Resume (PDF)
                                </a>
                                <a href="/docs/CV_Noutayla_Marketing.pdf" download className="btn btn-download">
                                    <DownloadCloud size={16} /> Marketing Resume (PDF)
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="social-links">
                            <a href="https://github.com/noutaylanefzaoui" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <GithubIcon size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/noutayla-nefzaoui-64454b331" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <LinkedinIcon size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-card">
                        <form
                            onSubmit={handleSubmit}
                            className="contact-form"
                            name="contact"
                            method="POST"
                            action={NETLIFY_FORM_SUCCESS_PATH}
                            netlify="true"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            data-netlify-honeypot="bot-field"
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <input type="hidden" name="bot-field" />
                            <div className="form-group">
                                <label htmlFor="form-name">Name</label>
                                <input 
                                    type="text" 
                                    id="form-name" 
                                    name="name" 
                                    required 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-email">Email</label>
                                <input 
                                    type="email" 
                                    id="form-email" 
                                    name="email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your email address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-subject">Subject</label>
                                <input 
                                    type="text" 
                                    id="form-subject" 
                                    name="subject" 
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="What's this about?"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="form-message">Message</label>
                                <textarea 
                                    id="form-message" 
                                    name="message" 
                                    required 
                                    rows={5} 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your message details..."
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-submit" disabled={submitting}>
                                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                                <Send className="btn-send-icon" size={14} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Floating Toast Notification */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast toast-${toast.type} show`}>
                        {toast.type === 'success' ? <CheckCircle className="toast-icon" /> : <AlertCircle className="toast-icon" />}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Contact;
