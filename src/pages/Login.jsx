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

function Login() {
  return (
    <Container>
      <PrimaryHeader>Chatify</PrimaryHeader>
      <SecondaryHeader>Login</SecondaryHeader>
      <AuthForm />
      Dont have an account?
      <Link to='/register'>Register</Link>
    </Container>
  );
}

export default Login;
