import React from 'react';

import { useToast } from '../../context/toast';
import { Container, FlexContainer, Text } from './styles';
import { BannerProps, mapTypeToTitle } from '../../utils/Interfaces';

const Banner: React.FC<BannerProps> = ({ display, message, type }) => {
  const { closeToast } = useToast();

  return (
    <Container display={display} type={type}>
      <FlexContainer>
        <Text>
          <h1>{mapTypeToTitle[type]}</h1>
          <p>{message}</p>
        </Text>
        <button type="button" onClick={closeToast}>
          <img id="close" src='/x.svg' alt="" />
        </button>
      </FlexContainer>
    </Container>
  );
};

export default Banner;