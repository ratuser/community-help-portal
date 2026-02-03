import React from "react";
import styled from "styled-components";

const Card = ({ title, description, createdAt, onEdit, onDelete }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <h3 className="title">{title}</h3>
          <p className="desc">{description}</p>
          <p className="date">{new Date(createdAt).toLocaleString()}</p>
          <div className="buttons">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 300px; /* Increased from 190px */
    height: 320px; /* Increased from 254px */
    background: #171717;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    box-shadow: 0px 0px 10px 3px #00000088;
    cursor: pointer;
    border-radius: 8px;
  }

  .card .content {
    border-radius: 5px;
    background: #171717;
    width: 296px; /* Adjusted to match card width - 4px */
    height: 316px; /* Adjusted to match card height - 4px */
    z-index: 1;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    box-sizing: border-box;
  }

  .content::before {
    opacity: 0;
    transition: opacity 300ms;
    content: " ";
    display: block;
    background: white;
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
    width: 120px; /* Increased from 80px */
    height: 450px; /* Increased from 360px */
    background: linear-gradient(#ff2288, #387ef0, #00ff88, #ff2288);
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
    width: 400px; /* Increased from 250px */
    height: 450px; /* Increased from 360px */
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

  .card .title {
    font-weight: bold;
    font-size: 1.3rem;
    margin: 0;
    background: linear-gradient(45deg, #ff2288, #387ef0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card .desc {
    font-size: 0.95rem;
    line-height: 1.4;
    margin: 0;
    flex-grow: 1;
    color: #ccc;
  }

  .card .date {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
  }

  .buttons {
    display: flex;
    gap: 10px;
    width: 100%;
    margin-top: auto;
  }

  .buttons button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
    flex: 1;
  }

  .buttons button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  .buttons button:first-child {
    background: linear-gradient(45deg, #387ef0, #00ff88);
    color: white;
  }

  .buttons button:first-child:hover {
    background: linear-gradient(45deg, #2965c7, #00cc6a);
  }

  .buttons button:last-child {
    background: linear-gradient(45deg, #ff2288, #ff6b6b);
    color: white;
  }

  .buttons button:last-child:hover {
    background: linear-gradient(45deg, #d91a72, #ff5252);
  }
`;

export default Card;