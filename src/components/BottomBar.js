import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ICONS = [
  require('../assets/icons/Refresh.png'),
  require('../assets/icons/Nope.png'),
  require('../assets/icons/BlueStar.png'),
  require('../assets/icons/Like.png'),
  require('../assets/icons/Flash.png'),
];

const Icons = styled.View`
  margin-top: 35px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Circle = styled.TouchableOpacity`
  background-color: white;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;

  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const BottomBar = () => {
  return (
    <Icons>
      {React.Children.toArray(
        ICONS.map((icon, index) => (
          <Circle
            style={{
              shadowColor: '#DCE0E6',
              shadowOpacity: 0.74,
              shadowRadius: 26,
              shadowOffset: {
                x: 0,
                y: 0,
              },
            }}
            size={index % 2 === 0 ? 50 : 60}
          >
            <Icon
              size={index % 2 === 0 ? 22 : 25}
              resizeMode="contain"
              source={icon}
            />
          </Circle>
        ))
      )}
    </Icons>
  );
};

export default BottomBar;
