import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import API_URL from "../api";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData({
          title: res.data.title,
          description: res.data.description,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequest();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/requests/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-requests");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageWrapper>
      <FormCard>
        <Heading>Edit Help Request</Heading>

        <Form onSubmit={handleSubmit}>
          <Label>Title</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <Button type="submit">Update Request</Button>
        </Form>
      </FormCard>
    </PageWrapper>
  );
};

export default EditRequest;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000, #111111);
  padding: 20px;
`;

const FormCard = styled.div`
  background: #0f0f0f;
  border-radius: 16px;
  padding: 35px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.15);
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 25px;
  font-size: 2rem;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #ffeb99;
  margin-bottom: 6px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 18px;
  border-radius: 8px;
  border: 1px solid #ffd700;
  background: #000;
  color: #ffd700;
  outline: none;

  &:focus {
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  margin-bottom: 25px;
  border-radius: 8px;
  border: 1px solid #ffd700;
  background: #000;
  color: #ffd700;
  resize: none;
  outline: none;

  &:focus {
    box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ffd700, #ffb700);
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  }
`;
