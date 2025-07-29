import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';

interface CustomTabProps {
  data: string[];
  onTabPress?: (value: string) => void;
  selectedTab?: string;
  round?: boolean;
}

const { width } = Dimensions.get('window');

const CustomTab: React.FC<CustomTabProps> = ({
  data,
  onTabPress,
  selectedTab,
  round = false,
}) => {
  const [selected, setSelected] = useState<string>(selectedTab || data[0]);

  const TABS_PER_ROW = round ? 3 : 4;
  const TAB_WIDTH = (width - 40) / TABS_PER_ROW - 8;
  const TAB_HEIGHT = 35;

  const handlePress = useCallback(
    (item: string) => {
      setSelected(item);
      onTabPress?.(item);
    },
    [onTabPress],
  );

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selected === item;
    const isLong = item.length > 8;

    const sharedStyle = {
      width: TAB_WIDTH,
      height: round ? TAB_HEIGHT - 5 : TAB_HEIGHT,
      borderRadius: round ? 5 : 0,
    };

    const content = (
      <View
        style={[
          styles.tab,
          sharedStyle,
          isSelected ? styles.tabSelected : styles.tabUnselected,
          !isSelected && !round && styles.tabBorder,
        ]}
      >
        <CustomText
          style={[
            styles.tabText,
            { fontSize: isLong ? 11 : 13 },
            isSelected && styles.tabTextSelected,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {item}
        </CustomText>
      </View>
    );

    return (
      <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
        {isSelected ? (
          <LinearGradient
            colors={['#007BFF', '#004A99']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[sharedStyle, styles.gradient, styles.tabMargin]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View style={styles.tabMargin}>{content}</View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={renderItem}
      numColumns={TABS_PER_ROW}
      scrollEnabled={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
  },
  tabMargin: {
    margin: 4,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabUnselected: {
    backgroundColor: '#F3F3F3',
  },
  tabSelected: {
    backgroundColor: 'transparent',
  },
  tabBorder: {
    borderWidth: 1,
    borderColor: '#808080a4',
  },
  tabText: {
    fontWeight: '500',
    color: '#000',
  },
  tabTextSelected: {
    color: '#fff',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTab;
