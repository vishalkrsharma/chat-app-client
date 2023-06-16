import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import { PrimaryHeader, SecondaryHeader } from '../styles/styles';
import { styled } from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

function Register() {
  return (
    <Container>
      <PrimaryHeader>Chatify</PrimaryHeader>
      <SecondaryHeader>Register</SecondaryHeader>
      <AuthForm />
      Already has an account?
      <Link to='/login'>Login</Link>
    </Container>
  );
}

export default Register;
