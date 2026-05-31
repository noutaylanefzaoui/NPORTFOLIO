import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

const Education = ({ educationData, extracurricularsData }) => {
    return (
        <section id="education" className="education-section section-padding">
            <div className="container">
                <div className="section-header">
                    <span className="subheading">Academic Path</span>
                    <h2 className="section-title">Education & Credentials</h2>
                </div>

                <div className="education-grid">
                    {/* Degree 1 */}
                    <div className="education-card">
                        <div className="education-icon-wrapper">
                            <GraduationCap size={20} />
                        </div>
                        <span className="edu-date">{educationData?.[0]?.date || "2023 - 2027"}</span>
                        <h3>{educationData?.[0]?.degree || "B.Sc. in Business Administration"}</h3>
                        <h4 className="school">{educationData?.[0]?.school || "Tunis Business School"}</h4>
                        <p className="edu-detail">
                            <strong>{educationData?.[0]?.focus || "IT Major & Marketing Minor"}</strong>
                        </p>
                        {educationData?.[0]?.desc && (
                            <p className="edu-desc">{educationData[0].desc}</p>
                        )}
                    </div>

                    {/* Degree 2 */}
                    <div className="education-card">
                        <div className="education-icon-wrapper">
                            <Award size={20} />
                        </div>
                        <span className="edu-date">{educationData?.[1]?.date || "2019 - 2023"}</span>
                        <h3>{educationData?.[1]?.degree || "Baccalaureate Degree"}</h3>
                        <h4 className="school">{educationData?.[1]?.school || "High School Al Athar"}</h4>
                        <p className="edu-detail">
                            <strong>{educationData?.[1]?.focus || "Specialization: Experimental Sciences"}</strong>
                        </p>
                        {educationData?.[1]?.desc && (
                            <p className="edu-desc">{educationData[1].desc}</p>
                        )}
                    </div>
                </div>

                {/* Extracurriculars */}
                <div className="extra-edu-wrapper">
                    <h3 className="extra-edu-title">Extracurricular Leadership</h3>
                    <div className="extra-edu-grid">
                        {(extracurricularsData || [
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
                        ]).map((extra, idx) => (
                            <div key={idx} className="extra-card">
                                <h4>{extra.organization}</h4>
                                <span 
                                    className="extra-role"
                                    dangerouslySetInnerHTML={{ __html: extra.role }}
                                ></span>
                                <p>{extra.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
