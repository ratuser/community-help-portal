import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "./Navbar";
import API_URL from "../api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Wrapper>
        <Navbar/>
      <AnimatedBackground />
      <Card>
        <FloatingOrb style={{ top: '10%', left: '10%' }} />
        <FloatingOrb style={{ bottom: '15%', right: '15%', animationDelay: '2s' }} />
        
        <IconWrapper>
          <ContactIcon>✉️</ContactIcon>
        </IconWrapper>
        
        <Heading>Get In Touch</Heading>
        <Subheading>We'd love to hear from you</Subheading>

        {success && (
          <Success>
            <SuccessIcon>✓</SuccessIcon>
            {success}
          </Success>
        )}

        <FormWrapper>
          <InputGroup>
            <InputLabel>Your Name</InputLabel>
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Your Email</InputLabel>
            <Input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Your Message</InputLabel>
            <Textarea
              name="message"
              placeholder="Tell us what's on your mind..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </InputGroup>

          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner />
                Sending...
              </>
            ) : (
              <>
                <ButtonIcon>📤</ButtonIcon>
                Send Message
              </>
            )}
          </Button>
        </FormWrapper>

        <FooterText>We'll get back to you within 24 hours</FooterText>
      </Card>
    </Wrapper>
  );
};

export default Contact;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255, 193, 7, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 10%, rgba(255, 235, 59, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%);
  z-index: 0;
  animation: backgroundPulse 15s ease infinite;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255, 215, 0, 0.02) 2px,
      rgba(255, 215, 0, 0.02) 4px
    );
    animation: gridRotate 30s linear infinite;
  }

  @keyframes backgroundPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
  }

  @keyframes gridRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(25px);
  padding: 35px 50px;
  border-radius: 26px;
  width: 100%;
  max-width: 700px;
  margin-top:50px;
  border: 1px solid rgba(255, 215, 0, 0.25);
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 215, 0, 0.15),
              0 0 60px rgba(255, 215, 0, 0.1);
  animation: cardFloat 1s ease;

  @keyframes cardFloat {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
  }
`;

const FloatingOrb = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: float 8s ease-in-out infinite;
  pointer-events: none;

  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(20px, 20px); }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ContactIcon = styled.div`
  font-size: 4rem;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
  animation: iconBounce 2s ease-in-out infinite;

  @keyframes iconBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffc107 100%);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 10px 0;
  animation: gradientShift 6s ease infinite;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.3));

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const Subheading = styled.p`
  text-align: center;
  color: rgba(255, 215, 0, 0.7);
  font-size: 1rem;
  margin: 0 0 35px 0;
  font-weight: 500;
`;

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
  padding: 15px 20px;
  border-radius: 16px;
  margin-bottom: 25px;
  font-weight: 600;
  animation: successSlide 0.5s ease;
  backdrop-filter: blur(10px);

  @keyframes successSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SuccessIcon = styled.span`
  font-size: 1.3rem;
  background: rgba(34, 197, 94, 0.2);
  border-radius: 50%;
  padding: 4px 8px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  color: #ffd700;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-left: 4px;
`;

const Input = styled.input`
  padding: 16px 18px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: #ffd700;
  border-radius: 14px;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 215, 0, 0.4);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 0.6);
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.15),
                inset 0 1px 0 rgba(255, 215, 0, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 16px 18px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: #ffd700;
  border-radius: 14px;
  font-size: 1rem;
  resize: vertical;
  min-height: 90px;
  font-family: inherit;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 215, 0, 0.4);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 215, 0, 0.6);
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.15),
                inset 0 1px 0 rgba(255, 215, 0, 0.1);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
  border: none;
  padding: 16px 24px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(255, 215, 0, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.2rem;
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: rgba(255, 215, 0, 0.5);
  font-size: 0.85rem;
  margin: 14px 0 0 0;
  font-weight: 500;
`;