import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

// --- Styled Components (can be shared with LoginPage) ---
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 100px 1rem; /* Adjust for navbar and give some padding */
`;

const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const SwitchViewLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TermsLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #555;
`;

// --- SignupPage Component ---
const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      password: password,
    };
    console.log('Creating account with:', formData);
    alert('Account created successfully! (Check console for data)');
    navigate('/login'); // Redirect to login page after successful registration
  };

  return (
    <PageContainer>
        <FormContainer>
            <Title>Create Account</Title>
            <Form onSubmit={handleRegister}>
              <Input type="text" name="name" placeholder="Full Name" required />
              <Input type="tel" name="phone" placeholder="Phone Number" required />
              <Input type="email" name="email" placeholder="Email" required />
              <Input type="password" name="password" placeholder="Password" required />
              <Input type="password" name="confirmPassword" placeholder="Confirm Password" required />
              <TermsLabel>
                <input type="checkbox" required style={{ marginRight: '8px' }} />
                I agree to the terms and conditions.
              </TermsLabel>
              <Button type="submit">Create Account</Button>
            </Form>
            <SwitchViewLink to="/login">
              Already have an account?
            </SwitchViewLink>
        </FormContainer>
    </PageContainer>
  );
};

export default SignupPage;
