import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios"; 
import styled from "styled-components";
import API_URL from "../api";

let socket;

const ChatPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Helper to get consistent User Data from LocalStorage
  const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  // Some apps store the ID directly in userInfo, others inside a user object
  const currentUserId = userData._id || userData.user?._id;
  const token = userData.token || localStorage.getItem("token");

  // 1. FETCH CHAT HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      // Prevents fetching if chatId is undefined or literal ":chatId"
      if (!chatId || chatId === ":chatId") return;

      try {
        const res = await axios.get(`${API_URL}/api/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Map the backend structure to our local state structure
        const history = res.data.messages.map(m => ({
          senderId: m.sender,
          text: m.text,
          createdAt: m.createdAt
        }));
        
        setMessages(history);
      } catch (err) {
        console.error("❌ Error loading history:", err);
      }
    };

    fetchHistory();
  }, [chatId, token]);

  // 2. SOCKET CONNECTION LOGIC
  useEffect(() => {
    if (!chatId || chatId === ":chatId") return;

    // Connect to your Render Backend
    // Note: Use the root URL (no /api) for Socket.io
    socket = io("https://community-help-portal.onrender.com", {
      transports: ["websocket", "polling"],
      withCredentials: true
    });

    socket.emit("joinChat", chatId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup on unmount
    return () => {
      if (socket) socket.disconnect();
    };
  }, [chatId]);

  // 3. AUTO-SCROLL TO BOTTOM
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // 4. MESSAGE HANDLERS
  const handleSend = () => {
    if (!text.trim() || !socket) return;

    const messageData = { 
        chatId, 
        senderId: currentUserId, 
        text 
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <div className="header-content">
          <div className="avatar-group">
            <div className="avatar">👤</div>
          </div>
          <div className="chat-info">
            <h2>Community Chat</h2>
            <span className="status">
              <span className="status-dot"></span>
              Active now
            </span>
          </div>
        </div>
      </ChatHeader>

      <MessagesArea>
        <div className="messages-wrapper">
          {messages.length === 0 ? (
            <EmptyState>
              <div className="empty-icon">💬</div>
              <h3>No messages yet</h3>
              <p>Start the conversation by sending a message below</p>
            </EmptyState>
          ) : (
            messages.map((msg, i) => {
              const isOwn = msg.senderId === currentUserId;
              const showAvatar = i === 0 || messages[i - 1].senderId !== msg.senderId;
              
              return (
                <MessageWrapper key={i} isOwn={isOwn}>
                  {!isOwn && showAvatar && (
                    <div className="message-avatar">👤</div>
                  )}
                  {!isOwn && !showAvatar && <div className="avatar-spacer"></div>}
                  
                  <MessageBubble isOwn={isOwn}>
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </MessageBubble>
                </MessageWrapper>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </MessagesArea>

      <InputArea>
        <div className="input-wrapper">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-input"
          />
          
          <button
            onClick={handleSend}
            className="send-btn"
            disabled={!text.trim()}
          >
            <span className="send-icon">✈️</span>
          </button>
        </div>
      </InputArea>
    </ChatContainer>
  );
};



const ChatContainer = styled.div`
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: radial-gradient(
      ellipse at top,
      rgba(250, 204, 21, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(250, 204, 21, 0.2);
  position: relative;
  z-index: 10;

  .header-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .avatar-group {
    position: relative;
  }

  .avatar {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border: 3px solid rgba(250, 204, 21, 0.3);
  }

  .chat-info h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #fff;
    font-weight: 700;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: #22c55e;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  .action-btn {
    width: 40px;
    height: 40px;
    background: rgba(250, 204, 21, 0.1);
    border: 1px solid rgba(250, 204, 21, 0.2);
    border-radius: 50%;
    color: #facc15;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(250, 204, 21, 0.2);
      border-color: #facc15;
    }
  }

  @media (max-width: 768px) {
    padding: 15px 20px;

    .avatar {
      width: 40px;
      height: 40px;
      font-size: 20px;
    }

    .chat-info h2 {
      font-size: 1rem;
    }
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  position: relative;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(250, 204, 21, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(250, 204, 21, 0.5);
    }
  }

  .messages-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;

  .empty-icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    color: #9ca3af;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #6b7280;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  align-items: flex-end;
  justify-content: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .message-avatar {
    width: 32px;
    height: 32px;
    background: rgba(250, 204, 21, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .avatar-spacer {
    width: 32px;
    flex-shrink: 0;
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: ${(props) =>
    props.isOwn ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  position: relative;
  word-wrap: break-word;
  background: ${(props) =>
    props.isOwn
      ? "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)"
      : "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"};
  border: 1px solid
    ${(props) =>
      props.isOwn ? "rgba(250, 204, 21, 0.3)" : "rgba(250, 204, 21, 0.2)"};
  box-shadow: ${(props) =>
    props.isOwn
      ? "0 4px 12px rgba(250, 204, 21, 0.2)"
      : "0 4px 12px rgba(0, 0, 0, 0.3)"};

  .message-text {
    color: ${(props) => (props.isOwn ? "#000" : "#e5e7eb")};
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 4px;
    font-weight: ${(props) => (props.isOwn ? "500" : "400")};
  }

  .message-time {
    font-size: 0.75rem;
    color: ${(props) => (props.isOwn ? "rgba(0, 0, 0, 0.6)" : "#6b7280")};
    text-align: right;
  }

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

const InputArea = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px 30px;
  border-top: 1px solid rgba(250, 204, 21, 0.2);
  position: relative;
  z-index: 10;

  .input-wrapper {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #0f0f1e;
    border-radius: 50px;
    padding: 8px 12px;
    border: 1px solid rgba(250, 204, 21, 0.2);
    transition: all 0.3s;

    &:focus-within {
      border-color: #facc15;
      box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.1);
    }
  }

  .emoji-btn,
  .attach-btn {
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(250, 204, 21, 0.1);
      transform: scale(1.1);
    }
  }

  .message-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #e5e7eb;
    font-size: 1rem;
    padding: 8px 12px;
    outline: none;

    &::placeholder {
      color: #6b7280;
    }
  }

  .send-btn {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #facc15 0%, #f59e0b 100%);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);

    .send-icon {
      font-size: 20px;
      transform: rotate(45deg);
      display: block;
    }

    &:hover:not(:disabled) {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(250, 204, 21, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    padding: 15px 20px;

    .input-wrapper {
      padding: 6px 10px;
      gap: 8px;
    }

    .emoji-btn,
    .attach-btn {
      width: 32px;
      height: 32px;
      font-size: 18px;
    }

    .send-btn {
      width: 40px;
      height: 40px;
    }
  }
`;
export default ChatPage;