import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import LabeledCheckbox from './LabeledCheckbox';
import CustomButton from './CustomButton';
import { ChevDown, ChevUp } from '../assets';
import useTheme from '../theme/useTheme';
import { fetchAllCategories } from '../services/homeService';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface CategorySelectorProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({onCategorySelect}) => {
  const [showCates, setShowCates] = useState(false);
  const theme = useTheme();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const { categories } = useSelector((state: RootState) => state.home);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await fetchAllCategories();
  };

   const toggleCategory = (id: string) => {
    let updatedSelection;
    if (selectedCategoryIds.includes(id)) {
      updatedSelection = selectedCategoryIds.filter(catId => catId !== id);
    } else {
      updatedSelection = [...selectedCategoryIds, id];
    }
    setSelectedCategoryIds(updatedSelection);
    const result = updatedSelection.length === 1 ? updatedSelection[0] : updatedSelection.join(',');
    onCategorySelect(result);
  };

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
            data={categories}
            contentContainerStyle={styles.catesList}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={{ width: '33%', padding: 3 }}>
                <LabeledCheckbox
                 size={14}
                 label={item.name} 
                    onPress={() => toggleCategory(item.id)}
                 />
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
