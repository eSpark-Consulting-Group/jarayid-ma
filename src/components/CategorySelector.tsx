import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import LabeledCheckbox from './LabeledCheckbox';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
import { COUNTRY_CATEGORIES } from '../constants';

const CategorySelector: React.FC = () => {
  const [showCates, setShowCates] = useState(false);
  return (
    <View>
      <CustomButton
        style={styles.categoryBtn}
        titleColor="#000"
        title="Category"
        onPress={() => setShowCates(!showCates)}
        iconLeft={showCates ? <ChevUp /> : <ChevDown />}
        titleStyle={{ fontFamily: 'Gilroy-SemiBold', fontSize: 17 }}
      />
      <View style={{ display: showCates ? 'flex' : 'none' }}>
        <View style={styles.catesContainer}>
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
    borderColor: '#D1E5FA',
    backgroundColor: '#EAF4FF',
  },
  catesContainer: {
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#D1E5FA',
    backgroundColor: '#EAF4FF',
    position: 'absolute',
    zIndex: 100,
  },
  catesList: {
    alignItems: 'center',
    gap: 15,
  },
});
