import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import LabeledCheckbox from './LabeledCheckbox';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
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
            data={Array(23)}
            contentContainerStyle={[styles.catesList]}
            numColumns={4}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width:
                    Array(23).length % 4 == 3 &&
                    index > Array(23).length - 1 - (Array(23).length % 4)
                      ? '33%'
                      : '25%',
                  alignItems: 'center',
                }}
              >
                <LabeledCheckbox label={'Lebanon'} />
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
