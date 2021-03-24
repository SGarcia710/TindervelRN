import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View``;

const ImageCard = (props) => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          shadowColor: '#DCE0E6',
          shadowOpacity: 0.1,
          shadowRadius: 7,
          shadowOffset: {
            x: 0,
            y: 0,
          },
        },
      ]}
    >
      <Image
        source={{ uri: props.data.largeImageURL }}
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: 9,
        }}
      />
    </View>
  );
};

export default ImageCard;
