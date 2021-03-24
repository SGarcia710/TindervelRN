import React from 'react';
import styled from 'styled-components/native';
import { Swipeable, TopBar, BottomBar } from '../components';
import useSWR from 'swr';

import { fetcher } from '../utils';
import { Text } from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 24px;
  background-color: #f7fbfc;
`;

const HomeScreen = () => {
  const { data, error } = useSWR(
    'https://pixabay.com/api/?key=19764031-d6578a0973ae47b61032aed65&orientation=vertical&category=travel&safesearch=true&editors_choice=true',
    fetcher
  );

  console.log('La data es: ', data);

  return (
    <Container>
      <TopBar />
      {!!error && <Text>Hubo un problema descargando la data</Text>}
      {!data && <Text>loading...</Text>}
      {!!data && <Swipeable data={data.hits} />}
      <BottomBar />
    </Container>
  );
};

export default HomeScreen;
