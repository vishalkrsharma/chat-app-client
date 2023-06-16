import React, { useState } from 'react';
import { styled } from 'styled-components';
import { BiHide, BiShow } from 'react-icons/bi';
import { PrimaryButton } from '../styles/styles';
import { useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  gap: 2rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: 2px solid #deeaed;

  &:focus {
    border: 2px solid #70a6b2;
  }
`;

const EyeButton = styled.button`
  color: #70a6b2;
  background-color: transparent;
  position: absolute;
  right: 1rem;
  top: 4.5rem;
`;

const FromButton = styled(PrimaryButton)`
  width: 50%;
`;

function AuthForm() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { pathname } = useLocation();
  const { register } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(userInfo);
  };

  return (
    <Form>
      <Field>
        <label>Username</label>
        <Input
          type='text'
          name='username'
          placeholder='Username'
          value={userInfo.username}
          onChange={handleChange}
        />
      </Field>
      <Field>
        <label>Password</label>
        <Input
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Password'
          value={userInfo.password}
          onChange={handleChange}
        />

        <EyeButton onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <BiShow style={{ color: 'blue' }} /> : <BiHide style={{ color: '#deeaed' }} />}
        </EyeButton>
      </Field>
      <FromButton
        type='submit'
        onClick={handleSubmit}
      >
        {pathname === '/register' ? 'Register' : 'Login'}
      </FromButton>
    </Form>
  );
}

export default AuthForm;
