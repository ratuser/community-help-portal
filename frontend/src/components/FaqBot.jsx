import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const faqs = [
  {
    question: "What is the Community Help Portal?",
    answer:
      "It is a platform that connects people who need help with those willing to offer support within the same local community.",
  },
  {
    question: "How can I request help?",
    answer:
      "After logging in, users can submit a help request by filling out a simple form with their requirements.",
  },
  {
    question: "Is login required?",
    answer:
      "Yes, users must log in to post requests or communicate with others to ensure safety and accountability.",
  },
  {
    question: "Who can offer help?",
    answer:
      "Anyone in the local community can offer help. Users are encouraged to respond to requests based on their ability and availability.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, the platform is completely free for both requesters and volunteers.",
  },
];

export default function FaqBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showGreeting, setShowGreeting] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setMessages([
        {
          type: "bot",
          text: "👋 Hi there! I'm your Help Assistant. How can I assist you today?",
        },
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleQuestionClick = (faq) => {
    
    const userMessage = { type: "user", text: faq.question };
    setMessages((prev) => [...prev, userMessage]);

    
    setTimeout(() => {
      const botMessage = { type: "bot", text: faq.answer };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);

    setShowGreeting(false);
  };

  const resetChat = () => {
    setMessages([
      {
        type: "bot",
        text: "👋 Hi there! I'm your Help Assistant. How can I assist you today?",
      },
    ]);
    setShowGreeting(true);
  };

  return (
    <PageWrapper>
      <Navbar/>
      
      <HeroSection>
        <div className="hero-content">
          <div className="icon-wrapper">
            <span className="hero-icon">💬</span>
          </div>
          <h1>Need Help? We're Here!</h1>
          <p className="hero-subtitle">
            Get instant answers to your questions about our Community Help Portal
          </p>
          <div className="cta-wrapper">
            <button className="cta-button" onClick={() => setIsOpen(true)}>
              <span>Start Chat</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

       
        <div className="floating-element element-1">❓</div>
        <div className="floating-element element-2">💡</div>
        <div className="floating-element element-3">🤝</div>
      </HeroSection>

      {/* FAQ Grid Section */}
      {/* <FaqSection>
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Quick answers to common questions about our platform
          </p>

          <div className="faq-grid">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-card">
                <div className="faq-icon">Q</div>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="bottom-cta">
            <p>Still have questions?</p>
            <button className="chat-trigger" onClick={() => setIsOpen(true)}>
              Chat with our Assistant
            </button>
          </div>
        </div>
      </FaqSection> */}

      
      {!isOpen && (
        <ChatButton onClick={() => setIsOpen(true)}>
          <span className="icon">💬</span>
          <span className="pulse"></span>
        </ChatButton>
      )}

      
      {isOpen && (
        <ChatWidget>
          
          <div className="chat-header">
            <div className="header-content">
              <div className="avatar">🤖</div>
              <div className="header-text">
                <h3>Help Assistant</h3>
                <span className="status">
                  <span className="status-dot"></span>
                  Always here to help
                </span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          
          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.type === "bot" && <div className="bot-avatar">🤖</div>}
                <div className="message-bubble">{msg.text}</div>
              </div>
            ))}

            
            {showGreeting && (
              <div className="faq-suggestions">
                <p className="suggestions-title">Popular questions:</p>
                {faqs.map((faq, idx) => (
                  <button
                    key={idx}
                    className="suggestion-btn"
                    onClick={() => handleQuestionClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            
            {!showGreeting && (
              <div className="show-more">
                <button className="reset-btn" onClick={resetChat}>
                  ← Show all questions
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {/* <div className="chat-footer">
            <p>Powered by Community Help Portal</p>
          </div> */}
        </ChatWidget>
      )}
    </PageWrapper>
  );
}



const PageWrapper = styled.div`
  background: #000;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 120px 20px 80px;
  text-align: center;
  background: linear-gradient(180deg, #0a0a0f 0%, #000 100%);
  overflow: hidden;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .icon-wrapper {
    display: inline-block;
    margin-bottom: 30px;
    animation: float 3s ease-in-out infinite;
  }

  .hero-icon {
    font-size: 80px;
    display: block;
    filter: drop-shadow(0 0 20px rgba(250, 204, 21, 0.4));
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: #d1d5db;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .cta-wrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .cta-button {
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    color: #000;
    border: none;
    padding: 18px 40px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(250, 204, 21, 0.3);

    .arrow {
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(250, 204, 21, 0.5);

      .arrow {
        transform: translateX(5px);
      }
    }
  }

  /* Floating decorative elements */
  .floating-element {
    position: absolute;
    font-size: 40px;
    opacity: 0.15;
    animation: float 4s ease-in-out infinite;
  }

  .element-1 {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
  }

  .element-2 {
    top: 30%;
    right: 15%;
    animation-delay: 1s;
  }

  .element-3 {
    bottom: 20%;
    left: 15%;
    animation-delay: 2s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    padding: 80px 20px 60px;

    h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .hero-icon {
      font-size: 60px;
    }
  }
`;

const FaqSection = styled.section`
  padding: 80px 20px;
  background: #000;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 800;
    color: #facc15;
    margin-bottom: 10px;
  }

  .section-subtitle {
    text-align: center;
    color: #9ca3af;
    font-size: 1.1rem;
    margin-bottom: 60px;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  .faq-card {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 1px solid rgba(250, 204, 21, 0.2);
    border-radius: 16px;
    padding: 30px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #facc15 0%, #f59e0b 100%);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover {
      transform: translateY(-5px);
      border-color: #facc15;
      box-shadow: 0 12px 32px rgba(250, 204, 21, 0.2);

      &::before {
        transform: scaleX(1);
      }

      .faq-icon {
        background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
        color: #000;
      }
    }
  }

  .faq-icon {
    width: 50px;
    height: 50px;
    background: rgba(250, 204, 21, 0.1);
    color: #facc15;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .faq-card h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .faq-card p {
    color: #d1d5db;
    line-height: 1.7;
    font-size: 0.95rem;
  }

  .bottom-cta {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    border: 1px solid rgba(250, 204, 21, 0.2);

    p {
      color: #e5e7eb;
      font-size: 1.2rem;
      margin-bottom: 20px;
      font-weight: 600;
    }

    .chat-trigger {
      background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
      color: #000;
      border: none;
      padding: 14px 32px;
      font-size: 1rem;
      font-weight: 700;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 24px rgba(250, 204, 21, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 32px rgba(250, 204, 21, 0.5);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 60px 20px;

    h2 {
      font-size: 2rem;
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(250, 204, 21, 0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  .icon {
    font-size: 32px;
    animation: bounce 2s infinite;
  }

  .pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(250, 204, 21, 0.4);
    animation: pulse 2s infinite;
  }

  &:hover {
    transform: scale(1.1);
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

const ChatWidget = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 420px;
  max-width: calc(100vw - 40px);
  height: 600px;
  max-height: calc(100vh - 100px);
  background: #1a1a2e;
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Header */
  .chat-header {
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 16px 16px 0 0;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    backdrop-filter: blur(10px);
  }

  .header-text h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #000;
    font-weight: 700;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  .close-btn {
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 50%;
    color: #000;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
      transform: rotate(90deg);
    }
  }

  /* Body */
  .chat-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #0f0f1e;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #facc15;
      border-radius: 3px;
    }
  }

  .message {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
    animation: fadeIn 0.4s ease;

    &.user {
      justify-content: flex-end;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .bot-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .message-bubble {
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 16px;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .message.bot .message-bubble {
    background: #1a1a2e;
    color: #e5e7eb;
    border: 1px solid rgba(250, 204, 21, 0.2);
  }

  .message.user .message-bubble {
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    color: #000;
    font-weight: 500;
  }

  /* FAQ Suggestions */
  .faq-suggestions {
    margin-top: 20px;
  }

  .suggestions-title {
    color: #9ca3af;
    font-size: 0.9rem;
    margin-bottom: 12px;
    font-weight: 600;
  }

  .suggestion-btn {
    display: block;
    width: 100%;
    background: #1a1a2e;
    border: 1px solid rgba(250, 204, 21, 0.3);
    color: #e5e7eb;
    padding: 12px 16px;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    font-size: 0.9rem;
    transition: all 0.3s;

    &:hover {
      background: rgba(250, 204, 21, 0.1);
      border-color: #facc15;
      transform: translateX(4px);
    }
  }

  .show-more {
    margin-top: 20px;
    text-align: center;
  }

  .reset-btn {
    background: transparent;
    border: 1px solid rgba(250, 204, 21, 0.5);
    color: #facc15;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;

    &:hover {
      background: rgba(250, 204, 21, 0.1);
      border-color: #facc15;
    }
  }

  /* Footer */
  .chat-footer {
    padding: 12px;
    text-align: center;
    background: #1a1a2e;
    border-top: 1px solid rgba(250, 204, 21, 0.2);

    p {
      margin: 0;
      font-size: 0.8rem;
      color: #6b7280;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
`;