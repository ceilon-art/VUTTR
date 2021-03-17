import React from 'react';
import Link from 'next/link';

import NavBar from '../components/NavBar';
import LoginButton from '../components/LoginButton';
import {
  Container,
  Section,
  Presentation,
  Background,
  Try,
  SideText,
  Author,
} from './styles';

const Home: React.FC = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Section>
          <h1>Are you tired of having 3.000 tools to organize your life?</h1>
          <h2>
            Worry no more! We made another tool just like the others, so you can
            now use 3.001 tools to help you!
          </h2>
        </Section>
      </Container>
      <Background>
        <Presentation>
          <h2>Presenting you...</h2>
          <h1>Very Useful Tools to Remember</h1>
          <p>
            A software that helps you save all the useful tools you use on your
            work and personal life
          </p>
        </Presentation>
      </Background>
      <Try>
        <img src='/girl.svg' alt="Logo Bossabox" />
        <SideText>
          <p>
            It takes 30 seconds to create your account, and the software is
            completely free
          </p>
          <Link href="/createaccount">
            <LoginButton color="#10B26C" hover="#12DB89">
              Create account
            </LoginButton>
          </Link>
        </SideText>
      </Try>
      <Author>
        <a
          href="https://github.com/ceilon-art?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Website created by André Luiz</p>
        </a>
      </Author>
    </>
  );
};

export default Home;