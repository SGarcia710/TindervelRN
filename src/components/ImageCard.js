import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 9,
    padding: 16,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    position: 'absolute',
    top: 16,
    borderWidth: 3,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  actionText: {
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  likeContainer: {
    left: 16,
    borderColor: '#12E19A',
    transform: [{ translateY: 25 }, { rotate: '-20deg' }],
  },
  likeText: {
    color: '#12E19A',
  },
  dislikeContainer: {
    right: 16,
    borderColor: '#FA307C',
    transform: [{ translateY: 30 }, { rotate: '20deg' }],
  },
  dislikeText: {
    color: '#FA307C',
  },
  name: {
    fontSize: 34,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginRight: 10,
  },
  age: {
    fontSize: 25,
    color: 'white',
    lineHeight: 34,
  },
  statusIcon: {
    backgroundColor: '#7CE14C',
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
  },
  statusText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 8,
  },
  infoIcon: {
    position: 'absolute',
    right: 16,
    bottom: 42,
  },
});

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

      props.scale.value = interpolate(
        posX.value,
        [-width / 2, 0, width / 2],
        [1, 0.95, 1]
      );
    },
    onEnd: (event, context) => {
      // scale.value = withSpring(1);
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
        { scale: props.scale.value },
      ],
    };
  });

  const animatedLikeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        posX.value,
        [0, width / 2],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const animatedDislikeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        posX.value,
        [-width / 2, 0],
        [1, 0],
        Extrapolate.CLAMP
      ),
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
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.likeContainer,
              styles.actionContainer,
              animatedLikeStyles,
            ]}
          >
            <Text style={[styles.likeText, styles.actionText]}>Like</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.dislikeContainer,
              styles.actionContainer,
              animatedDislikeStyles,
            ]}
          >
            <Text style={[styles.dislikeText, styles.actionText]}>Nope</Text>
          </Animated.View>

          <View style={{ ...styles.row, alignItems: 'flex-end' }}>
            <Text
              numberOfLines={1}
              style={styles.name}
            >{`${props.data.user.slice(0, 10)}${
              props.data.user.length > 10 ? '...' : ''
            }`}</Text>
            <Text style={styles.age}>20</Text>
          </View>
          <View style={{ ...styles.row, marginBottom: 10 }}>
            <View style={styles.statusIcon} />
            <Text style={styles.statusText}>Recently active</Text>
          </View>
          <View style={styles.row}>
            <Image source={require('../assets/icons/Location.png')} />
            <Text style={styles.locationText}>16 kilometres away</Text>
          </View>
          <TouchableOpacity style={styles.infoIcon}>
            <Image source={require('../assets/icons/Info.png')} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ImageCard;
