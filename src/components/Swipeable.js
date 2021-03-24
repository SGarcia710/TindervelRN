import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { ImageCard } from '.';

const Container = styled.View`
  flex: 1;
  /* z-index: 100; */
`;

const Swipeable = ({ data }) => {
  return (
    <Container>
      {React.Children.toArray(
        data.map((landscape) => {
          return <ImageCard data={landscape} />;
        })
      )}
    </Container>
  );
};

export default Swipeable;
