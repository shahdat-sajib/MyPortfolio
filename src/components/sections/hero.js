import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 620px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
  .avatar-container {
    position: absolute;
    top: 52%;
    right: 11px;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover; 
    background-color: var(--green);
  }
  @media (max-width: 768px) {
  .avatar-container {
    display: none; 
  }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <>
    <h2 className="big-heading">Md Shahdat Hosain</h2>
    {/* <StaticImage
      className="avatar-container wrapper"
      src="../../images/me3.png"
      width={500}
      quality={95}
      formats={['AUTO', 'WEBP', 'AVIF']}
      alt="Headshot"
    /> */}
  </>;
  const three = <h3 className="big-heading">I automate things for you.</h3>;
  const four = (
    <>
      <p>
        I’m a Full Stack Software Engineer specializing in automating (and occasionally designing) exceptional, high-quality applications and API services for all platform.
        Currently, I’m focused on automating the SQA process and developing an automation framework using Java, Groovy, Antlr grammer, Spoke etc. for {' '}
        <a href="https://global.rakuten.com/corp/" target="_blank" rel="noreferrer">
          The Largest E-commerce Company in Japan
        </a>
        {' '}as an offshore resource
        from{' '}
        <a href="https://bjitgroup.com/" target="_blank" rel="noreferrer">
          BJIT Group Bangladesh
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://drive.google.com/drive/folders/1622mF7ij-K5-cBOX2Enjp-EGUlN3o_SA"
      target="_blank"
      rel="noreferrer">
      Check out my achievements!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
