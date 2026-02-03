import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";

export default function About() {
  return (
      <Section>
        <Navbar/>
      <div className="container">

        <h2 className="title">
          What is the Community Help Portal?
        </h2>

        <p className="description">
          The Community Help Portal is a community-driven platform designed
          to connect people who need help with those willing to support them.
          It focuses on trust, accessibility, and meaningful connections within
          local neighborhoods.
        </p>

        
        <div className="card-grid">
          <InfoCard 
            title="Help Requests" 
            text="Users can post requests for assistance related to daily needs, emergencies, or community support." 
          />
          <InfoCard 
            title="Community Support" 
            text="The platform encourages people within the same locality to help one another and build stronger communities." 
          />
          <InfoCard 
            title="Real-Time Chat" 
            text="Integrated chat enables secure and instant communication between users for effective coordination." 
          />
          <InfoCard 
            title="Secure Access" 
            text="JWT-based authentication ensures secure access, privacy, and controlled interactions." 
          />
        </div>
      </div>
    </Section>
  );
}


function InfoCard({ title, text }) {
  return (
    <CardWrapper>
      <div className="card">
        <div className="content">
          <div className="card-title">{title}</div>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </CardWrapper>
  );
}


const Section = styled.section`
  background: #000;
  padding: 140px 20px;
  color: white;

  .container {
    max-width: 1300px;
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #facc15;
    margin-bottom: 20px;
  }

  .description {
    max-width: 900px;
    margin: 0 auto 80px;
    font-size: 1.15rem;
    color: #d1d5db;
    line-height: 1.8;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 60px;
    justify-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
    
    .description {
      font-size: 1rem;
    }
    
    .card-grid {
      gap: 40px;
    }
  }
`;

const CardWrapper = styled.div`
  .card {
    width: 250px;
    height: 300px;
    background: #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 3px 1px #00000088;
    cursor: pointer;
    border-radius: 8px;
  }

  .card .content {
    border-radius: 5px;
    background: #171717;
    width: 246px;
    height: 296px;
    z-index: 1;
    padding: 30px 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #facc15;
    margin-bottom: 16px;
  }

  .card-text {
    font-size: 0.95rem;
    color: #d1d5db;
    line-height: 1.6;
    margin: 0;
  }

  .content::before {
    opacity: 0;
    transition: opacity 300ms;
    content: " ";
    display: block;
    background: #facc15;
    width: 5px;
    height: 50px;
    position: absolute;
    filter: blur(50px);
    overflow: hidden;
  }

  .card:hover .content::before {
    opacity: 1;
  }

  .card::before {
    opacity: 0;
    content: " ";
    position: absolute;
    display: block;
    width: 180px;
    height: 360px;
    background: linear-gradient(#facc15, #f59e0b);
    transition: opacity 300ms;
    animation: rotation_9018 8000ms infinite linear;
    animation-play-state: paused;
  }

  .card:hover::before {
    opacity: 1;
    animation-play-state: running;
  }

  .card::after {
    position: absolute;
    content: " ";
    display: block;
    width: 250px;
    height: 360px;
    background: #17171733;
    backdrop-filter: blur(50px);
  }

  @keyframes rotation_9018 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;