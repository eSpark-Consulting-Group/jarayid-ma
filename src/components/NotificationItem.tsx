import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo'; // For 3 dots icon
import CustomText from './CustomText';
import ButtonGradient from './ButtonGradient';
import useTheme from '../theme/useTheme';

interface NotificationItemProps {
  initials: string;
  message: string;
  time: string;
  onViewPress?: () => void;
  onOptionsPress?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  initials,
  message,
  time,
  onViewPress,
  onOptionsPress,
}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {/* Avatar + Message */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <CustomText size={16} style={styles.avatarText}>
            {initials}
          </CustomText>
        </View>
        <View style={styles.messageBlock}>
          <CustomText
            fontFamily="Gilroy-SemiBold"
            style={styles.message}
            color={theme.dark ? 'white' : '#383535'}
          >
            {message}
          </CustomText>
          <ButtonGradient
            onPress={() => {}}
            title="View"
            gradientStyle={styles.viewButton}
          />
        </View>
        <View style={styles.rightBlock}>
          <CustomText style={styles.time} size={12}>
            {time}
          </CustomText>
          <TouchableOpacity onPress={onOptionsPress}>
            <Icon name="dots-three-vertical" size={16} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View
        style={[
          styles.divider,
          {
            backgroundColor: theme.dark ? 'grey' : '#E5E7EB',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: {
    backgroundColor: '#434A54',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  messageBlock: {
    flex: 1,
  },
  message: {
    // color: '#383535',
    marginBottom: 8,
    fontWeight: '500',
  },
  viewButton: {
    borderRadius: 6,
    height: 40,
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#fff',

    fontWeight: '600',
  },
  rightBlock: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 48,
    marginLeft: 8,
  },
  time: {
    color: '#9DA3B4',
    fontWeight: '500',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    marginTop: 12,
  },
});

export default NotificationItem;
