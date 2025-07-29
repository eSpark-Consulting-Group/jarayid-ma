import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  MainLogo: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  LeftIcon,
  RightIcon,
  MainLogo,
  onLeftPress,
  onRightPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {LeftIcon ? (
          <TouchableOpacity onPress={onLeftPress}>{LeftIcon}</TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.center}>{MainLogo}</View>

      <View style={styles.side}>
        {RightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            {RightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  side: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 24,
    height: 24,
  },
});

export default Header;
