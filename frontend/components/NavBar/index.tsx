import React from 'react';
import Link from 'next/link';

import LoginButton from '../LoginButton';
import { Container, Header, Login } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <Link href="/">
          <img src='/bossabox.svg' alt="Logo Bossabox" />
        </Link>
        <Login>
          <Link href="createAccount">
            <p>Create account</p>
          </Link>
          <Link href="login">
            <LoginButton>Login</LoginButton>
          </Link>
        </Login>
      </Header>
    </Container>
  );
};

export default Home;