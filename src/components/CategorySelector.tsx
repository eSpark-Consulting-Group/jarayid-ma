import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import LabeledCheckbox from './LabeledCheckbox';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
import { COUNTRY_CATEGORIES } from '../constants';
import useTheme from '../theme/useTheme';

const CategorySelector: React.FC = () => {
  const [showCates, setShowCates] = useState(false);
  const theme = useTheme();
  return (
    <View>
      <CustomButton
        style={[
          styles.categoryBtn,
          {
            backgroundColor: theme.dark ? '#333' : '#EAF4FF',
            borderColor: theme.dark ? '#494949ff' : '#D1E5FA',
          },
        ]}
        titleColor={theme.dark ? '#e2e2e2' : '#000'}
        title="Category"
        onPress={() => setShowCates(!showCates)}
        iconLeft={showCates ? <ChevUp /> : <ChevDown />}
        titleStyle={{ fontFamily: 'Gilroy-SemiBold', fontSize: 17 }}
      />
      <View style={{ display: showCates ? 'flex' : 'none' }}>
        <View
          style={[
            styles.catesContainer,
            {
              backgroundColor: theme.dark ? '#333' : '#EAF4FF',
              borderColor: theme.dark ? '#494949ff' : '#D1E5FA',
            },
          ]}
        >
          <FlatList
            data={COUNTRY_CATEGORIES}
            contentContainerStyle={styles.catesList}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: '33%',
                }}
              >
                <LabeledCheckbox size={14} label={item} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  categoryBtn: {
    borderRadius: 10,
    borderWidth: 1,
  },
  catesContainer: {
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    zIndex: 100,
  },
  catesList: {
    alignItems: 'center',
    gap: 15,
  },
});
