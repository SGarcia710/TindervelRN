import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { ImageCard } from '.';

const Container = styled.View`
  flex: 1;
  /* z-index: 100; */
`;

const Swipeable = ({ data }) => {
  const [_data, setData] = useState(data);

  const handleSwipe = useCallback(
    (destination) => {
      console.log('Me fui', destination);
      setData(_data.slice(0, _data.length - 1));
    },
    [_data]
  );

  return (
    <Container>
      {React.Children.toArray(
        _data.map((landscape, index) => {
          const isOnTop = index === _data.length - 1;
          return (
            <ImageCard
              isOnTop={isOnTop}
              data={landscape}
              handleSwipe={handleSwipe}
            />
          );
        })
      )}
    </Container>
  );
};

export default Swipeable;
