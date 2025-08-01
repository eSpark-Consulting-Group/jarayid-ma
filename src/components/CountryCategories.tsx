import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { COUNTRY_CATEGORIES, COUNTRY_CATEGORIES_DATA } from '../constants';
import ButtonGradient from './ButtonGradient';
import { ArrowRight } from '../assets';
import ToggleBtn from './ToggleBtn';
import HeaderText from './HeaderText';
import useTheme from '../theme/useTheme';

interface CountryCategoriesProps {
  theme: ReactNavigation.Theme;
}

const CountryCategories: React.FC<CountryCategoriesProps> = ({ theme }) => {
  // const theme = useTheme();
  const [toggleOn, setToggleOn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
  } | null>(null);

  return (
    <View>
      {!selectedCountry ? (
        <View>
          <HeaderText
            size={24}
            fontFamily="Gilroy-ExtraBold"
            color="#004A99"
            text="Country Categories"
            style={{ textAlign: 'center' }}
            theme={theme}
          />
          <FlatList
            data={COUNTRY_CATEGORIES}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: '#8F8F8F45' }} />
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedCountry({ name: item })}
              >
                <HeaderText
                  key={index}
                  size={18}
                  text={item}
                  style={{ textAlign: 'center', paddingVertical: 10 }}
                  theme={theme}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={{ paddingVertical: 10, gap: 20 }}>
          <ButtonGradient
            title={selectedCountry.name}
            gradientStyle={styles.button}
            color={['#007BFF', '#004A99']}
            iconLeft={<ArrowRight style={{ marginHorizontal: 20 }} />}
            textStyle={{ fontSize: 18, marginHorizontal: 20 }}
            onPress={() => setSelectedCountry(null)}
            theme={theme}
            isHeader
          />
          {COUNTRY_CATEGORIES_DATA.map((item, index) => (
            <View key={index}>
              <HeaderText
                size={18}
                fontFamily="Gilroy-ExtraBold"
                color="#004A99"
                text={item.category}
                style={{ textAlign: 'center' }}
                theme={theme}
              />
              {item.data.map((item, index) => (
                <View key={index} style={styles.categoryStatus}>
                  <HeaderText size={18} text={item.name} theme={theme} />
                  <ToggleBtn value={toggleOn} onValueChange={setToggleOn} />
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default CountryCategories;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 0,
    justifyContent: 'space-between',
  },
  categoryStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#005BBC',
    padding: 15,
  },
});
