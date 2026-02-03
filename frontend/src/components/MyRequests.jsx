import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Card from "./Card";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/requests/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/requests/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== id)
      );
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-request/${id}`);
  };

  if (loading) {
    return (
      <StyledContainer>
        <AnimatedBackground />
        <GlassPanel>
          <Spinner />
          <LoadingText>Loading your requests...</LoadingText>
        </GlassPanel>
      </StyledContainer>
    );
  }

  if (requests.length === 0) {
    return (
      <StyledContainer>
        <AnimatedBackground />
        <GlassPanel>
          <EmptyIcon>📭</EmptyIcon>
          <NoDataText>No requests yet.</NoDataText>
          <SubText>Create your first request to get started!</SubText>
        </GlassPanel>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <AnimatedBackground />
      <ContentWrapper>
        <HeaderSection>
          <PageHeading>My Requests</PageHeading>
          <RequestCount>{requests.length} Active Request{requests.length !== 1 ? 's' : ''}</RequestCount>
        </HeaderSection>
        <CardsGrid>
          {requests.map((req, index) => (
            <CardWrapper key={req._id} style={{ animationDelay: `${index * 0.1}s` }}>
              <Card
                title={req.title}
                description={req.description}
                createdAt={req.createdAt}
                onEdit={() => handleEdit(req._id)}
                onDelete={() => handleDelete(req._id)}
              />
            </CardWrapper>
          ))}
        </CardsGrid>
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
  background: radial-gradient(circle at 20% 50%, rgba(120, 0, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 90%, rgba(0, 200, 255, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
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
      rgba(255, 255, 255, 0.03) 2px,
      rgba(255, 255, 255, 0.03) 4px
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
  font-size: 4rem;
  font-weight: 800;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientFlow 8s ease infinite;
  text-shadow: 0 0 80px rgba(102, 126, 234, 0.5);
  letter-spacing: -1px;

  @keyframes gradientFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const RequestCount = styled.div`
  display: inline-block;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CardWrapper = styled.div`
  animation: fadeInUp 0.6s ease backwards;

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

const GlassPanel = styled.div`
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin: 100px auto;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  text-align: center;
  animation: floatIn 1s ease;

  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 30px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.3rem;
  color: #fff;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  animation: bounce 2s ease infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const NoDataText = styled.p`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

export default MyRequests;