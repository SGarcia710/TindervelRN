import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width, height } = Dimensions.get('window');

const alpha = Math.PI / 12;
const A = Math.sin(alpha) * height + Math.cos(alpha) * width;

const snapPoints = [-A, 0, A];

const ImageCard = (props) => {
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.oldX = posX.value;
      context.oldY = posY.value;
    },
    onActive: ({ translationX, translationY }, context) => {
      posX.value = context.oldX + translationX;
      posY.value = context.oldY + translationY;
    },
    onEnd: (event, context) => {
      const destination = snapPoint(posX.value, event.velocityX, snapPoints);
      posX.value = withSpring(
        destination,
        {
          velocity: event.velocityX,
          restSpeedThreshold: destination === 0 ? 0.01 : 100,
          restDisplacementThreshold: destination === 0 ? 0.01 : 100,
        },
        () => {
          if (destination !== 0) {
            runOnJS(props.handleSwipe)(destination);
          }
        }
      );
      posY.value = withSpring(0, {
        velocity: event.velocityY,
      });
    },
  });

  const animatedContainerStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: posX.value },
        { translateY: posY.value },
        {
          rotate: interpolate(
            posX.value,
            [-width / 2, 0, width / 2],
            [alpha, 0, -alpha],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
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
          animatedContainerStyles,
        ]}
      >
        <Image
          source={{ uri: props.data.largeImageURL }}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 9,
          }}
        />
        <View>
          <Text>Like</Text>
        </View>
        <View>
          <Text>Dislike</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ImageCard;
