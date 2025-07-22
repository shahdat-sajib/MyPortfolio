import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsSection = styled.section`
  margin: 0 auto;
  padding: 30px 0;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    padding: 15px 0;
  }

  .inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 20px;
    margin-top: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 15px;
      margin-top: 20px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      grid-gap: 12px;
      margin-top: 15px;
    }
  }

  .subsection-header {
    grid-column: 1 / -1;
    margin: 40px 0 20px 0;
    text-align: center;

    @media (max-width: 768px) {
      margin: 30px 0 15px 0;
    }

    @media (max-width: 480px) {
      margin: 25px 0 12px 0;
    }

    h3 {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-lg);
      font-weight: 500;
      margin: 0;
      position: relative;
      display: inline-block;

      &:before,
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        width: 100px;
        height: 1px;
        background-color: var(--lightest-navy);
      }

      &:before {
        right: calc(100% + 20px);
      }

      &:after {
        left: calc(100% + 20px);
      }

      @media (max-width: 768px) {
        &:before,
        &:after {
          width: 50px;
        }
      }
    }
  }
`;

const StyledCertification = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 20px;
  transition: var(--transition);
  position: relative;
  border: 1px solid var(--lightest-navy);
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px var(--navy-shadow);

    @media (max-width: 768px) {
      transform: none;
      box-shadow: none;
    }
  }

  .cert-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;

    @media (max-width: 480px) {
      margin-bottom: 12px;
    }

    .cert-logo {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      background-color: var(--green);
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: var(--navy);
      flex-shrink: 0;

      @media (max-width: 480px) {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        font-size: 20px;
      }
    }

    .cert-info {
      flex: 1;

      .cert-title {
        margin: 0 0 8px 0;
        color: var(--lightest-slate);
        font-size: var(--fz-lg);
        font-weight: 600;
        line-height: 1.3;
      }

      .cert-issuer {
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-sm);
        font-weight: 500;
        margin-bottom: 5px;
      }

      .cert-date {
        color: var(--light-slate);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
      }
    }
  }

  .cert-description {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
  }

  .cert-skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 20px;
    margin-left: 0;
    padding-left: 0;

    li {
      background-color: var(--navy);
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      padding: 5px 10px;
      border-radius: var(--border-radius);
      list-style: none;
      border: 1px solid var(--green);
      width: fit-content;
      margin: 0;
    }
  }

  .cert-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid var(--lightest-navy);

    .cert-id {
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      opacity: 0.8;
    }

    .cert-status {
      display: flex;
      align-items: center;
      gap: 8px;

      .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--green);
      }

      .status-text {
        color: var(--green);
        font-family: var(--font-mono);
        font-size: var(--fz-xs);
        font-weight: 500;
      }
    }
  }

  .cert-verify-link {
    color: var(--green);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: var(--transition);
    margin-top: 10px;

    &:hover {
      color: var(--lightest-slate);
    }

    &:after {
      content: '↗';
      font-size: var(--fz-sm);
      transition: var(--transition);
    }

    &:hover:after {
      transform: translate(2px, -2px);
    }
  }
`;

const Certifications = () => {
    const revealContainer = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        sr.reveal(revealContainer.current, srConfig());
    }, []);

    // Sample certifications data - replace with your actual certifications
    const certifications = [
        {
            id: 1,
            title: 'Advanced AI Prompt Engineering',
            issuer: 'Udemy (Professional Online learning platform)',
            date: 'January 2025',
            expiryDate: null,
            logo: 'Udemy',
            description:
                'Covers advanced techniques for engineering effective prompts for large language models including GPT-based systems.',
            skills: ['Prompt Engineering', 'Generative AI', 'LLMs', 'GPT'],
            credentialId: 'AI-PROMPT-ENG-2025',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 2,
            title: 'Cypress - Modern Automation Testing from Scratch + Frameworks',
            issuer: 'Udemy (Professional Online learning platform)',
            date: 'March 2024',
            expiryDate: null,
            logo: 'Udemy',
            description:
                'Comprehensive training on end-to-end testing using Cypress, including framework design and CI/CD integration.',
            skills: ['Cypress', 'Test Automation', 'JavaScript Testing', 'Framework Design'],
            credentialId: 'CYP-AUTO-2024',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 3,
            title: 'Atlassian Confluence',
            issuer: 'Udemy (Professional Online learning platform)',
            date: 'May 2023',
            expiryDate: null,
            logo: 'Udemy',
            description:
                'Trained in collaboration, documentation, and project knowledge management using Atlassian Confluence.',
            skills: ['Confluence', 'Documentation', 'Team Collaboration'],
            credentialId: 'ATL-CONF-2023',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 4,
            title: 'Functional Programming + Lambdas, Method References, Streams',
            issuer: 'Udemy (Professional Online learning platform)',
            date: 'May 2023',
            expiryDate: null,
            logo: 'Udemy',
            description:
                'Focused on Java functional programming concepts including lambda expressions, method references, and Stream API.',
            skills: ['Functional Programming', 'Lambdas', 'Streams', 'Java'],
            credentialId: 'JAVA-FUNC-2023',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 5,
            title: 'DevOps Integration with Jenkins Pipelines',
            issuer: 'Alison',
            date: 'May 2023',
            expiryDate: null,
            logo: 'Alison',
            description:
                'Hands-on experience with Jenkins pipelines, CI/CD automation, and DevOps practices.',
            skills: ['DevOps', 'Jenkins', 'CI/CD', 'Pipeline'],
            credentialId: 'JENKINS-DEVOPS-2023',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 6,
            title: "Fortinet's Network Security Expert (NSE 1)",
            issuer: 'FORTINET',
            date: 'October 2022',
            expiryDate: 'December 2022',
            logo: 'Fortinet',
            description:
                'Foundational level certification demonstrating knowledge in basic network security concepts and Fortinet products.',
            skills: ['Network Security', 'Cybersecurity Basics', 'Fortinet'],
            credentialId: 'NSE-1-2022',
            verifyLink: '',
            status: 'Certified',
        },
    ];

    // Additional training data
    const additionalTraining = [
        {
            id: 6,
            title: "SQA Automation and Cyber Security Training",
            issuer: 'EDGE | ICT Division',
            date: 'October 2022',
            expiryDate: '',
            logo: 'Fortinet',
            description:
                'Automation testing and cybersecurity training covering Selenium, Cypress, and network security fundamentals.',
            skills: ['Network Security', 'Cybersecurity Basics', 'SQA Automation', 'Selenium', 'Cypress'],
            credentialId: 'SQA-CYBER-EDGE-2022',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 7,
            title: 'Advanced IoT Training',
            issuer: 'Yuan Ze University, Taiwan',
            date: 'Year Not Specified',
            expiryDate: null,
            logo: 'YZU',
            description:
                'Specialized training focused on Internet of Things (IoT) architecture, device communication, and real-world applications.',
            skills: ['IoT', 'Embedded Systems', 'Sensor Networks', 'IoT Architecture'],
            credentialId: 'IOT-YZU',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 8,
            title: 'Cross Platform Apps Development',
            issuer: 'ICT Division, Dhaka',
            date: 'Year Not Specified',
            expiryDate: null,
            logo: 'ICTDivision',
            description:
                'Program covering techniques for developing mobile and desktop apps using cross-platform technologies.',
            skills: ['Cross-Platform', 'Flutter', 'React Native', 'App Development'],
            credentialId: 'CPAD-ICT-01',
            verifyLink: '',
            status: 'Certified',
        },
        {
            id: 9,
            title: 'International Empowerment Program (IdEEP)',
            issuer: 'Indonesia',
            date: 'Year Not Specified',
            expiryDate: null,
            logo: 'IdEEP',
            description:
                'Empowerment program aimed at building global leadership, innovation mindset, and cross-cultural collaboration.',
            skills: ['Leadership', 'Innovation', 'Cross-Cultural Skills', 'Teamwork'],
            credentialId: 'IDEEP-INT-01',
            verifyLink: '',
            status: 'Certified',
        },
    ];


    return (
        <StyledCertificationsSection id="certifications" ref={revealContainer}>
            <h2 className="numbered-heading">Certifications</h2>

            <div className="inner">
                {certifications.map((cert, i) => (
                    <StyledCertification key={cert.id}>
                        <div className="cert-header">
                            <div className="cert-logo">{cert.logo}</div>
                            <div className="cert-info">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-issuer">{cert.issuer}</div>
                                <div className="cert-date">
                                    Issued: {cert.date} | Expires: {cert.expiryDate || 'No Expiry'}
                                </div>
                            </div>
                        </div>

                        <p className="cert-description">{cert.description}</p>

                        {cert.skills && (
                            <ul className="cert-skills">
                                {cert.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        )}

                        <div className="cert-footer">
                            <span className="cert-id">ID: {cert.credentialId}</span>
                            <div className="cert-status">
                                <div className="status-indicator"></div>
                                <span className="status-text">{cert.status}</span>
                            </div>
                        </div>

                        {cert.verifyLink && (
                            <a
                                href={cert.verifyLink}
                                className="cert-verify-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Verify Certificate
                            </a>
                        )}
                    </StyledCertification>
                ))}

                {/* Additional Training Subsection */}
                <div className="subsection-header">
                    <h3>Additional Training</h3>
                </div>

                {additionalTraining.map((training, i) => (
                    <StyledCertification key={training.id}>
                        <div className="cert-header">
                            <div className="cert-logo">{training.logo}</div>
                            <div className="cert-info">
                                <h3 className="cert-title">{training.title}</h3>
                                <div className="cert-issuer">{training.issuer}</div>
                                <div className="cert-date">
                                    Completed: {training.date} | Expires: {training.expiryDate || 'No Expiry'}
                                </div>
                            </div>
                        </div>

                        <p className="cert-description">{training.description}</p>

                        {training.skills && (
                            <ul className="cert-skills">
                                {training.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        )}

                        <div className="cert-footer">
                            <span className="cert-id">ID: {training.credentialId}</span>
                            <div className="cert-status">
                                <div className="status-indicator"></div>
                                <span className="status-text">{training.status}</span>
                            </div>
                        </div>

                        {training.verifyLink && (
                            <a
                                href={training.verifyLink}
                                className="cert-verify-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Verify Certificate
                            </a>
                        )}
                    </StyledCertification>
                ))}
            </div>
        </StyledCertificationsSection>
    );
};

export default Certifications;
