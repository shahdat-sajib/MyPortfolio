import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import achv1 from '../../images/achv1.png';
import achv2 from '../../images/achv2.png';
import achv3 from '../../images/achv3.png';
import achv4 from '../../images/achv4.png';
import achv5 from '../../images/achv5.png';
import achv6 from '../../images/achv6.png';
import achv7 from '../../images/achv7.png';
import achv8 from '../../images/achv8.png';
import achv9 from '../../images/achv9.png';
import achv10 from '../../images/achv10.png';
import achv11 from '../../images/achv11.png';
import achv12 from '../../images/achv12.png';

const StyledAchievementsSection = styled.section`
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: 15px;
      margin-top: 20px;
    }

    @media (max-width: 480px) {
      grid-gap: 12px;
      margin-top: 15px;
    }
  }
`;

const StyledAchievement = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 20px;
  transition: var(--transition);
  position: relative;
  border: 1px solid var(--lightest-navy);

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

  .achievement-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    @media (max-width: 480px) {
      margin-bottom: 8px;
    }

    .achievement-icon {
      width: 120px;
      height: 100px;
      margin-right: 15px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--navy);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      cursor: pointer;

      @media (max-width: 768px) {
        width: 100%;
        height: 80px;
        margin-right: 0;
        margin-bottom: 10px;
      }

      @media (max-width: 480px) {
        height: 70px;
        margin-bottom: 8px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .achievement-date {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      margin-left: auto;

      @media (max-width: 768px) {
        margin-left: 0;
        align-self: flex-end;
      }
    }
  }

  .achievement-title {
    margin: 0 0 8px 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
      margin: 0 0 6px 0;
    }

    @media (max-width: 480px) {
      font-size: var(--fz-md);
      margin: 0 0 5px 0;
    }
  }

  .achievement-description {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.5;
    margin-bottom: 10px;

    @media (max-width: 480px) {
      font-size: var(--fz-xs);
      margin-bottom: 8px;
      line-height: 1.4;
    }
  }

  .achievement-organization {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (max-width: 480px) {
      font-size: var(--fz-xxs);
    }
  }

  .achievement-skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px;
    margin-top: 10px;
    margin-left: 0;
    padding-left: 0;

    @media (max-width: 480px) {
      gap: 4px;
      margin-top: 8px;
    }

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

      @media (max-width: 480px) {
        font-size: var(--fz-xxs);
        padding: 4px 8px;
      }
    }
  }
`;

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }

  .modal-content {
    position: relative;
    width: 70vw;
    height: 70vh;
    max-width: 800px;
    max-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 85vw;
      height: 70vh;
      max-width: 90vw;
      max-height: 80vh;
    }

    @media (max-width: 480px) {
      width: 95vw;
      height: 60vh;
      max-width: 95vw;
      max-height: 70vh;
    }
  }

  .modal-image {
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    object-fit: contain;
    background-color: white;
  }

  .close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 45px;
    height: 45px;
    background-color: var(--green);
    border: none;
    border-radius: 50%;
    color: var(--navy);
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    
    &:hover {
      background-color: var(--lightest-slate);
      transform: scale(1.1);
    }

    &:focus {
      outline: 2px solid var(--green);
      outline-offset: 2px;
    }

    @media (max-width: 768px) {
      top: -15px;
      right: -15px;
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
  }
`;

const Achievements = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // Add keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && modalImage) {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  const openModal = (imgSrc) => setModalImage(imgSrc);
  
  const closeModal = () => setModalImage(null);

  // Handle any click to close modal
  const handleModalClick = () => {
    closeModal();
  };

  const achievements = [
    {
      id: 1,
      title: 'Gold Award on Highly Motivated Employee of the year',
      description:
        'Recognized for outstanding contribution to automation tools development and innovative solutions.',
      organization: 'BJIT Group',
      date: '2025',
      icon: achv1,
      skills: ['Automation', 'Self-Motivated', 'Skilled', 'FocusedAtWork'],
    },
    {
      id: 2,
      title: 'Star of the Department of Software Engineering',
      description:
        'Awarded for academic excellence, technical skills, and contributions to departmental success.',
      organization: 'Daffodil International University',
      date: '2022',
      icon: achv2,
      skills: ['AcademicExcellence', 'Leadership', 'TechContribution'],
    },
    {
      id: 3,
      title: 'Champion of National Environment Carnival',
      description:
        'Won for presenting sustainable tech solutions addressing environmental challenges.',
      organization: 'Bangladesh University of Engineering & Technology',
      date: '2022',
      icon: achv3,
      skills: ['GreenTech', 'Innovation', 'EnvironmentalAwareness'],
    },
    {
      id: 4,
      title: 'Champion of ICT Carnival',
      description:
        'Recognized for innovative ICT project demonstrating strong development and presentation skills.',
      organization: 'Daffodil International University',
      date: '2021',
      icon: achv4,
      skills: ['ICTInnovation', 'ProjectDevelopment', 'Presentation'],
    },
    {
      id: 5,
      title: 'Runner-up of NASA Space Apps Challenge',
      description:
        'Awarded for creating impactful space-tech solution under NASA’s global hackathon.',
      organization: 'BASIS',
      date: '2021',
      icon: achv5,
      skills: ['Hackathon', 'SpaceTech', 'Teamwork'],
    },
    {
      id: 6,
      title: 'Champion of MIST Inter-university ICT Innovation Fiesta',
      description:
        'Won for best ICT innovation among participating universities, showcasing unique solutions.',
      organization: 'Military Institute of Science and Technology',
      date: '2022',
      icon: achv6,
      skills: ['Innovation', 'ICTSolutions', 'Competition'],
    },
    {
      id: 7,
      title: 'Champion of RUSC National Science Fest',
      description:
        'Recognized for exceptional scientific project and outstanding presentation.',
      organization: 'Rajshahi University',
      date: '2021',
      icon: achv7,
      skills: ['ScienceFair', 'Research', 'PresentationSkills'],
    },
    {
      id: 8,
      title: 'Champion of NASA Space Apps Challenge',
      description:
        'Developed and presented a winning tech solution in NASA’s global hackathon.',
      organization: 'BASIS',
      date: '2020',
      icon: achv8,
      skills: ['SpaceApps', 'ProblemSolving', 'Teamwork'],
    },
    {
      id: 9,
      title: 'Silver Award in IBIC International Business Idea Challenge',
      description:
        'Secured silver for innovative business idea with a global impact pitch.',
      organization: 'MMU, Malaysia',
      date: '2021',
      icon: achv9,
      skills: ['BusinessModel', 'Pitching', 'Innovation'],
    },
    {
      id: 10,
      title: 'Silver Award in International E-Business & Idea Showcase Competition',
      description:
        'Recognized for a standout business and tech integration idea on an international platform.',
      organization: 'MMU, Malaysia',
      date: '2022',
      icon: achv10,
      skills: ['E-Business', 'Showcase', 'Creativity'],
    },
    {
      id: 11,
      title: 'Top 10 at Student 2 Startup Challenge',
      description:
        'Ranked among top 10 for a tech startup idea with potential national impact.',
      organization: 'ICT Division, Bangladesh',
      date: '2019',
      icon: achv11,
      skills: ['StartupIdea', 'Entrepreneurship', 'TechInnovation'],
    },
    {
      id: 12,
      title: 'Top 7 at Databird Launchpad',
      description:
        'Secured top 7 position for a promising tech product idea at national launchpad event.',
      organization: 'ICT Division, Bangladesh',
      date: '2021',
      icon: achv12,
      skills: ['ProductDesign', 'TechPitch', 'Execution'],
    },
  ];

  return (
    <>
      <StyledAchievementsSection id="achievements" ref={revealContainer}>
        <h2 className="numbered-heading">Achievements</h2>

        <div className="inner">
          {achievements.map((achievement) => (
            <StyledAchievement key={achievement.id}>
              <div className="achievement-header">
                <div
                  className="achievement-icon"
                  onClick={() => openModal(achievement.icon)}
                >
                  <img src={achievement.icon} alt={`${achievement.title} icon`} />
                </div>
                <span className="achievement-date">{achievement.date}</span>
              </div>

              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
              <div className="achievement-organization">{achievement.organization}</div>

              {achievement.skills && (
                <ul className="achievement-skills">
                  {achievement.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              )}
            </StyledAchievement>
          ))}
        </div>
      </StyledAchievementsSection>

      {modalImage && createPortal(
        <Modal isOpen={!!modalImage} onClick={handleModalClick}>
          <div className="modal-content">
            <button 
              className="close-button" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <img 
              src={modalImage} 
              alt="Enlarged achievement" 
              className="modal-image"
            />
          </div>
        </Modal>,
        document.body
      )}
    </>
  );
};

export default Achievements;
