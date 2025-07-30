import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';

interface IAnimatedButton {
  value: boolean;
  onValueChange: (value: boolean) => void;
  large?: boolean;
}

const ToggleBtn: React.FC<IAnimatedButton> = ({
  value,
  onValueChange,
  large = false,
}) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  const handleOnPress = () => {
    Animated.timing(animatedValue, {
      toValue: value ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      onValueChange(!value);
    });
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0, // Move to 1 for true, 0 for false
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: large ? [0, 1] : [0, 1],
    outputRange: large ? [0, 22] : [4, 26],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleOnPress}>
      <View
        style={
          Boolean(value)
            ? [styles.switchContainerActive]
            : [styles.switchContainer]
        }
      >
        <Animated.View
          style={[
            styles.switchHandle,
            {
              transform: [{ translateX }],
              backgroundColor: Boolean(value) ? '#FFF' : '#383535',
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};
export default ToggleBtn;

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: 'center',
    width: 45,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#E0E6EB',
  },
  switchContainerActive: {
    width: 45,
    height: 20,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#007BFF',
  },
  switchHandle: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#383535',
  },
});
