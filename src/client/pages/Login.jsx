// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { login } from "../services/authService";

// // --- Styled Components ---
// const PageContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-color: #f8f9fa;
//   padding-top: 80px;
// `;

// const FormContainer = styled.div`
//   background: white;
//   padding: 2.5rem;
//   border-radius: 12px;
//   width: 100%;
//   max-width: 420px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 1.5rem;
//   color: #333;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   padding: 12px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   font-size: 16px;
//   margin-bottom: 1rem;
//   &:focus {
//     outline: none;
//     border-color: #007bff;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }
// `;

// const Button = styled.button`
//   padding: 12px 20px;
//   border-radius: 8px;
//   border: none;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   background-color: #007bff;
//   color: white;
//   transition: background-color 0.2s;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const SwitchViewLink = styled(Link)`
//   display: block;
//   text-align: center;
//   margin-top: 1rem;
//   color: #007bff;
//   cursor: pointer;
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// // --- LoginPage Component ---
// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const { role } = await login(email, password);

//       // Save role in localStorage (for navigation logic)
//       localStorage.setItem('role', role);

//       if (role === 'ROLE_CUSTOMER') {
//         navigate('/');
//       } else if (role === 'ROLE_ADMIN') {
//         navigate('/admin/dashboard');
//       } else {
//         setError('Unauthorized role');
//       }
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error(err);
//     }
//   };

//   return (
//     <PageContainer>
//       <FormContainer>
//         <Title>Login</Title>
//         <Form onSubmit={handleLogin}>
//           <Input type="email" name="email" placeholder="Email" required />
//           <Input type="password" name="password" placeholder="Password" required />
//           <Button type="submit">Login</Button>
//         </Form>
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//         <SwitchViewLink to="/signup">Create new account</SwitchViewLink>
//       </FormContainer>
//     </PageContainer>
//   );
// };

// export default LoginPage;

// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- Styled Components ---
const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 80px;
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

// --- LoginPage Component ---
const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password); // ✅ context login updates user
      console.log("Login successful 3");
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    }
  };

  // ✅ Navigate only after user state is updated
  useEffect(() => {
    console.log("User role:", user ? user.role : "No user");
    if (user && user.role) {
      if (user.role === 'ROLE_CUSTOMER') {
        console.log("Login successful 2");
        navigate('/');
      } else if (user.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <PageContainer>
      <FormContainer>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <Input type="email" name="email" placeholder="Email" required />
          <Input type="password" name="password" placeholder="Password" required />
          <Button type="submit">Login</Button>
        </Form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <SwitchViewLink to="/signup">Create new account</SwitchViewLink>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
