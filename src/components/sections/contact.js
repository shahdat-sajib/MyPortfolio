import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import emailjs from '@emailjs/browser';

const StyledContactSection = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
  text-align: center;

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 20px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 0px;
    margin-bottom: 50px;
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

  .description {
    font-size: var(--fz-lg);
    margin-bottom: 40px;
    color: var(--slate);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    padding: 30px;
    border-radius: 12px;
    background-color: var(--light-navy);
    box-shadow: 0 10px 30px -10px var(--navy-shadow);

    input,
    textarea {
      width: 100%;
      padding: 12px 15px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid var(--slate);
      background-color: var(--navy);
      color: var(--white);
      transition: border 0.3s;

      &:focus {
        border-color: var(--green);
        outline: none;
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    button {
      ${({ theme }) => theme.mixins.smallButton};
      background-color: var(--green);
      color: var(--navy);
      font-weight: 600;
      border: none;

      &:hover {
        background-color: var(--green-tint);
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const formRef = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        'service_jr5utos', // Replace
        'template_zt2cpt9', // Replace
        formRef.current,
        '7vTiZCppdKDALSm2z' // Replace
      )
      .then(
        () => {
          alert('Message sent successfully!');
          formRef.current.reset();
          setLoading(false);
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Get In Touch</h2>
      <p className="description">
        Although I’m not currently looking for any new opportunities, my inbox is always open. <br /> Whether it’s a question, a suggestion, or just a hello — feel free to drop a message. I’ll try
        my best to get back to you!
      </p>
      <a
        className="email-link"
        href="mailto:shahdat.se@gmail.com?subject=Hello%20Shahdat&body=I%20wanted%20to%20say%20hi!"
      >
        Say Hello
      </a>
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <h5 className="">
        Give a direct message ↓
      </h5>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </StyledContactSection>
  );
};

export default Contact;
