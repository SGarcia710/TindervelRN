import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';

const ICONS = [
  require('../assets/icons/Tinder.png'),
  require('../assets/icons/Star.png'),
  require('../assets/icons/Messages.png'),
  require('../assets/icons/Profile.png'),
];

const ICON_SIZE = 32;

const Icons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Icon = styled.Image`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`;

const TopBar = () => {
  return (
    <Icons>
      {React.Children.toArray(
        ICONS.map((icon) => <Icon resizeMode="contain" source={icon} />)
      )}
    </Icons>
  );
};

export default TopBar;
