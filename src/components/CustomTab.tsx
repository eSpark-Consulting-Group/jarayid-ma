import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CustomText from './CustomText';
import useTheme from '../theme/useTheme';

interface TabItem {
  id: string;
  name: string;
}

interface CustomTabProps {
  data: TabItem[];
  onTabPress?: (value: TabItem) => void;
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
  const theme = useTheme();
  const [selected, setSelected] = useState<string>(
    selectedTab || (data[0]?.id ?? ''),
  );

  const TABS_PER_ROW = round ? 3 : 4;
  const TAB_WIDTH = (width - 40) / TABS_PER_ROW - 8;
  const TAB_HEIGHT = 35;

  const handlePress = useCallback(
    (item: TabItem) => {
      setSelected(item.id);
      onTabPress?.(item);
    },
    [onTabPress],
  );

  const renderItem = ({ item }: { item: TabItem }) => {
    const isSelected = selected === item.id;
    const isLong = item.name.length > 8;

    const sharedStyle = {
      width: TAB_WIDTH,
      height: round ? TAB_HEIGHT - 5 : TAB_HEIGHT,
      borderRadius: round ? 5 : 0,
      borderWidth: isSelected ? 0 : 1,
      borderColor: round && !theme.isDark ? '#EBE5E5' : '#808080a4',
    };

    const content = (
      <View
        style={[
          styles.tab,
          sharedStyle,
          isSelected
            ? styles.tabSelected
            : { backgroundColor: theme.dark ? theme.colors.card : '#F3F3F3' },
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
          color={isSelected ? '#fff' : theme.dark ? '#b6b3b3ff' : '#000'}
        >
          {item.name}
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
      keyExtractor={item => item.id}
      renderItem={renderItem}
      horizontal
      contentContainerStyle={styles.listContent}
      showsHorizontalScrollIndicator={false}
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
  tabText: {
    fontWeight: '500',
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
