import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import CustomText from './CustomText';
import { COUNTRY_CATEGORIES, COUNTRY_CATEGORIES_DATA } from '../constants';
import ButtonGradient from './ButtonGradient';
import { ArrowRight } from '../assets';
import ToggleBtn from './ToggleBtn';

const CountryCategories: React.FC = () => {
  const [toggleOn, setToggleOn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
  } | null>(null);

  return (
    <View>
      {!selectedCountry ? (
        <View>
          <CustomText
            size={24}
            fontFamily="Gilroy-ExtraBold"
            color="#004A99"
            text="Country Categories"
            style={{ textAlign: 'center' }}
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
                <CustomText
                  key={index}
                  size={18}
                  text={item}
                  style={{ textAlign: 'center', paddingVertical: 10 }}
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
          />
          {COUNTRY_CATEGORIES_DATA.map((item, index) => (
            <View key={index}>
              <CustomText
                size={18}
                fontFamily="Gilroy-ExtraBold"
                color="#004A99"
                text={item.category}
                style={{ textAlign: 'center' }}
              />
              {item.data.map((item, index) => (
                <View key={index} style={styles.categoryStatus}>
                  <CustomText size={18} text={item.name} />
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
