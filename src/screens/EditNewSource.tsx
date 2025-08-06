import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CategorySelector, LabeledCheckbox, ScreenTitle } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import { useNavigation } from '@react-navigation/native';
import { MainTabNavigationProp } from '../navigation/navigation';
import useTheme from '../theme/useTheme';
import {
  getAllNewSourceData,
  NewSourceFilterParams,
  NewsSource,
} from '../services/editNewSource';
import { useTranslation } from 'react-i18next';

const EditNewSource: React.FC = () => {
  const navigation = useNavigation<MainTabNavigationProp<'EditNewSource'>>();
  const theme = useTheme();
  const { t } = useTranslation();
  const [sources, setSources] = useState<NewsSource[]>([]);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async (filters: NewSourceFilterParams = {}) => {
    try {
      console.log('Fetching sources with filters:', filters);
      const data = await getAllNewSourceData(filters);
      setSources(data);
    } catch (error) {
      console.error('Failed to fetch sources', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScreenTitle title={t('screens.editNewsSource.title')} />
      <CategorySelector
        onCategorySelect={categoryID =>
          fetchSources(categoryID ? { categoryId: categoryID } : {})
        }
      />
      <FlatList
        data={sources}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LabeledCheckbox
            label={item.name}
            labelSize={18}
            labelColor="#000"
            labelFontfamily="Gilroy-SemiBold"
            imageURL={item.logo}
          />
        )}
      />

      <ButtonGradient
        title={t('screens.editNewsSource.button')}
        onPress={() => {
          navigation.goBack();
        }}
        color={['#007BFF', '#004A99']}
        gradientStyle={styles.saveBtn}
        textStyle={{ textAlign: 'center' }}
      />
    </View>
  );
};

export default EditNewSource;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  saveBtn: {
    width: 138,
    height: 50,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
});
