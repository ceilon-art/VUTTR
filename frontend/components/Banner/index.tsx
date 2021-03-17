import React from 'react';

import { useToast } from '../../context/toast';
import { Container, FlexContainer, Text } from './styles';
import xSVG from '../../assets/x.svg';
import { BannerProps, mapTypeToSVG, mapTypeToTitle } from '../../utils/Interfaces';

const Banner: React.FC<BannerProps> = ({ display, message, type }) => {
  const { closeToast } = useToast();

  return (
    <Container display={display} type={type}>
      <FlexContainer>
        <img src={mapTypeToSVG[type]} alt="" />
        <Text>
          <h1>{mapTypeToTitle[type]}</h1>
          <p>{message}</p>
        </Text>
        <button type="button" onClick={closeToast}>
          <img id="close" src={xSVG} alt="" />
        </button>
      </FlexContainer>
    </Container>
  );
};

export default Banner;