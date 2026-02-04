import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import API_URL from "../api";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const getToken = () => {
    let token = localStorage.getItem("token");
    if (!token) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      token = userInfo.token;
    }
    return token;
  };

  const getCurrentUserId = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    return userInfo._id;
  };

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, []);

  const handleOfferHelp = async (request) => {
    try {
      const token = getToken();
      if (!token) return;

      const requesterId = request.createdBy?._id || request.user?._id;
      if (!requesterId) return;

      const res = await axios.post(
        `${API_URL}/api/chats/offer-help`,
        { requestId: request._id, userId: requesterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const chat = res.data;
      navigate(`/chat/${chat._id}`);
    } catch (err) {
      console.error("Error creating/opening chat:", err);
    }
  };

  const handleStatusChange = async (request) => {
    try {
      const token = getToken();
      if (!token) return;

      const newStatus = request.status === "Open" ? "Resolved" : "Open";

      await axios.put(
        `${API_URL}/api/requests/${request._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRequests((prev) =>
        prev.map((r) => (r._id === request._id ? { ...r, status: newStatus } : r))
      );

      if (typeof window.refreshDashboard === "function") {
        window.refreshDashboard();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <StyledContainer>
      <AnimatedBackground />
      <ContentWrapper>
        <HeaderSection>
          <PageHeading>All Community Requests</PageHeading>
          <TotalCount>{requests.length} Active {requests.length !== 1 ? 'Requests' : 'Request'}</TotalCount>
        </HeaderSection>

        {requests.length > 0 ? (
          <RequestsGrid>
            {requests.map((req, index) => (
              <RequestCard key={req._id} style={{ animationDelay: `${index * 0.08}s` }}>
                <CardContent>
                  <CardHeader>
                    <Title>{req.title}</Title>
                    <StatusBadge status={req.status}>
                      <StatusDot status={req.status} />
                      {req.status}
                    </StatusBadge>
                  </CardHeader>

                  <Description>{req.description}</Description>

                  <MetaInfo>
                    <InfoRow>
                      <InfoLabel>Posted by:</InfoLabel>
                      <InfoValue>{req.createdBy?.name || "Anonymous"}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>Created:</InfoLabel>
                      <InfoValue>{new Date(req.createdAt).toLocaleDateString()}</InfoValue>
                    </InfoRow>
                  </MetaInfo>

                  <ButtonGroup>
                    {req.createdBy?._id === currentUserId && (
                      <StatusButton onClick={() => handleStatusChange(req)}>
                        <StatusIcon>{req.status === "Open" ? "✓" : "↻"}</StatusIcon>
                        Mark as {req.status === "Open" ? "Resolved" : "Open"}
                      </StatusButton>
                    )}
                    <HelpButton onClick={() => handleOfferHelp(req)}>
                      <HelpIcon>🤝</HelpIcon>
                      Offer Help
                    </HelpButton>
                  </ButtonGroup>
                </CardContent>
              </RequestCard>
            ))}
          </RequestsGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>No requests yet.</EmptyText>
            <EmptySubtext>Be the first to create a community request!</EmptySubtext>
          </EmptyState>
        )}
      </ContentWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 40px 20px;
  overflow: hidden;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 90%, rgba(255, 235, 59, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%);
  z-index: 0;
  animation: backgroundPulse 20s ease infinite;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 215, 0, 0.03) 2px,
      rgba(255, 215, 0, 0.03) 4px
    );
    animation: gridMove 30s linear infinite;
  }

  @keyframes backgroundPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.8s ease;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const PageHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffc107 50%, #ffb300 75%, #ffd700 100%);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 8s ease infinite;
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.4));
  letter-spacing: -1px;

  @keyframes gradientFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const TotalCount = styled.div`
  display: inline-block;
  padding: 12px 28px;
  background: rgba(255, 215, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 50px;
  color: #ffd700;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 215, 0, 0.2);
`;

const RequestsGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const RequestCard = styled.div`
  background: rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 215, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease backwards;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(255, 215, 0, 0.2),
                0 0 40px rgba(255, 215, 0, 0.1),
                inset 0 1px 0 rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 215, 0, 0.4);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CardContent = styled.div`
  padding: 28px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffd700;
  margin: 0;
  flex: 1;
  line-height: 1.3;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: ${props => props.status === "Resolved" 
    ? "rgba(34, 197, 94, 0.15)" 
    : "rgba(239, 68, 68, 0.15)"};
  border: 1px solid ${props => props.status === "Resolved" 
    ? "rgba(34, 197, 94, 0.3)" 
    : "rgba(239, 68, 68, 0.3)"};
  border-radius: 20px;
  color: ${props => props.status === "Resolved" ? "#4ade80" : "#f87171"};
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.status === "Resolved" ? "#4ade80" : "#f87171"};
  animation: pulse 2s ease infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const Description = styled.p`
  color: rgba(255, 215, 0, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 215, 0, 0.1);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoLabel = styled.span`
  color: rgba(255, 215, 0, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #ffd700;
  font-size: 0.85rem;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const BaseButton = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  backdrop-filter: blur(10px);
`;

const StatusButton = styled(BaseButton)`
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60a5fa;

  &:hover {
    background: rgba(59, 130, 246, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const HelpButton = styled(BaseButton)`
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #ffd700;

  &:hover {
    background: rgba(255, 215, 0, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
`;

const StatusIcon = styled.span`
  font-size: 1.1rem;
`;

const HelpIcon = styled.span`
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: rgba(255, 215, 0, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 30px;
  max-width: 500px;
  margin: 60px auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
  animation: bounce 2s ease infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const EmptyText = styled.p`
  font-size: 1.5rem;
  color: #ffd700;
  font-weight: 600;
  margin: 0 0 10px 0;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
`;

const EmptySubtext = styled.p`
  font-size: 1rem;
  color: rgba(255, 215, 0, 0.7);
  margin: 0;
`;

export default AllRequests;