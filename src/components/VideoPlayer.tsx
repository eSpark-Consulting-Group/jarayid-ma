import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

import { Cross } from '../assets';

interface VideoPlayerProps {
  visible: boolean;
  videoId?: string;
  onClose?: () => void;
}

const { width, height } = Dimensions.get('window');

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  visible,
  videoId,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      backdropColor={'#000'}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 100,
          }}
        >
          <Cross width={30} height={30} color={'#fff'} />
        </TouchableOpacity>
        <YoutubePlayer
          height={height * 0.35}
          play={false}
          videoId={'FpYJyHVxtJ4'}
        />
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
});
