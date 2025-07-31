import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { CategorySelector, LabeledCheckbox, ScreenTitle } from '../components';
import ButtonGradient from '../components/ButtonGradient';
import { useNavigation } from '@react-navigation/native';
import { MainTabNavigationProp } from '../navigation/navigation';

const EditNewSource: React.FC = () => {
  const navigation = useNavigation<MainTabNavigationProp<'EditNewSource'>>();
  return (
    <View style={styles.container}>
      <ScreenTitle title="Edit News Source" />
      <CategorySelector />
      <FlatList
        data={Array(3)}
        renderItem={() => (
          <LabeledCheckbox
            label="https://almasryalyoum.com"
            labelSize={18}
            labelColor="#000"
            labelFontfamily="Gilroy-SemiBold"
            imageURL="https://upload.wikimedia.org/wikipedia/fr/thumb/1/14/Akhbar_el-Yom.png/960px-Akhbar_el-Yom.png?20230612140638"
          />
        )}
      />
      <ButtonGradient
        title="Save"
        onPress={() => navigation.goBack()}
        color={['#007BFF', '#004A99']}
        gradientStyle={styles.saveBtn}
      />
    </View>
  );
};

export default EditNewSource;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF' },
  saveBtn: {
    width: '40%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    alignSelf: 'flex-end',
  },
});
