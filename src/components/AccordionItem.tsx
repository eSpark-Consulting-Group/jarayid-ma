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

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
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
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.header,
          expanded && styles.headerExpanded,
        ]}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <Text style={styles.question}>{question}</Text>
        <Animated.View style={{ transform: [{ rotate }], backgroundColor: '#007BFF', borderRadius: 100 }}>
          <Icon name="chevron-down" size={20} color="#fff" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <Animated.View style={styles.body}>
          <Text style={styles.answer}>{answer}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9DBE9',
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerExpanded: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#E4E4E4',
  },
  question: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  body: {
    padding: 16,
    backgroundColor: '#fff',
  },
  answer: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default AccordionItem;
