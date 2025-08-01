import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import useTheme from '../theme/useTheme';
import CustomText from './CustomText';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggle = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.dark ? '#494949ff' : '#D9DBE9' },
      ]}
    >
      <TouchableOpacity
        style={[styles.header, expanded && styles.headerExpanded]}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <CustomText
          style={styles.question}
          color={theme.dark ? '#e2e2e2' : '#000'}
          size={14}
          fontFamily="Gilroy-SemiBold"
        >
          {question}
        </CustomText>
        <Animated.View
          style={{
            transform: [{ rotate }],
            backgroundColor: '#007BFF',
            borderRadius: 100,
          }}
        >
          <Icon name="chevron-down" size={20} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <Animated.View style={styles.body}>
          <CustomText
            style={styles.answer}
            color={theme.dark ? '#b9b9b9ff' : '#444'}
            size={14}
          >
            {answer}
          </CustomText>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerExpanded: {},
  question: {
    flex: 1,
    marginRight: 10,
  },
  body: {
    padding: 16,
    // backgroundColor: '#fff',
  },
  answer: {
    lineHeight: 20,
  },
});

export default AccordionItem;
