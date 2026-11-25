import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

const Education = ({ educationData, extracurricularsData }) => {
    const education = educationData || [
        { degree: 'B.Sc. Business Administration', school: 'Tunis Business School', date: '2023 - 2027', focus: 'IT Major & Marketing Minor' },
        { degree: 'Baccalaureate', school: 'High School Al Athar', date: '2019 - 2023', focus: 'Experimental Sciences' }
    ];
    const activities = extracurricularsData || [];

    return (
        <section id="education" className="education-section section-padding">
            <div className="container">
                <div className="section-eyebrow-row">
                    <span className="section-eyebrow"><span>05</span> The foundations</span>
                    <span className="section-side-note">Learning keeps the work moving.</span>
                </div>
                <div className="education-heading-row">
                    <div className="section-header">
                        <p className="subheading">Classroom to community</p>
                        <h2 className="section-title">Learning by<br /><em>looking closer.</em></h2>
                    </div>
                    <div className="education-symbol" aria-hidden="true"><BookOpen size={42} strokeWidth={1.1} /><span>✳</span></div>
                </div>

                <div className="education-list">
                    {education.map((item, index) => (
                        <article className="education-row" key={`${item.school}-${item.degree}`}>
                            <div className="education-row-index">0{index + 1}</div>
                            <div className="education-row-copy">
                                <span className="edu-date">{item.date}</span>
                                <h3>{item.degree}</h3>
                                <p>{item.school}</p>
                                {item.focus && <span className="edu-focus">{item.focus}</span>}
                            </div>
                            <span className="education-row-icon"><GraduationCap size={20} /></span>
                        </article>
                    ))}
                </div>

                {activities.length > 0 && (
                    <div className="activities-area">
                        <div className="activities-heading"><span className="section-eyebrow"><span>06</span> Beyond the lecture hall</span><h3>Good work<br /><em>takes a team.</em></h3></div>
                        <div className="activities-list">
                            {activities.map((item) => (
                                <article className="activity-row" key={item.organization}>
                                    <div><h4>{item.organization}</h4><p>{item.desc}</p></div>
                                    <span>{item.role?.replace(/&bull;/g, '•')}</span>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Education;
