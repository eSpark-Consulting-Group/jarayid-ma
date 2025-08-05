import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from './CustomText';
import useTheme from '../theme/useTheme';
import { useFontSize } from '../context/FontSizeContext';

export interface SelectorOption {
  value: string;
  label: string;
  subtitle?: string;
  icon?: string;
}

interface CustomSelectorProps {
  label: string;
  placeholder: string;
  options: SelectorOption[];
  selectedValue?: string;
  onSelect: (option: SelectorOption) => void;
  error?: string;
  hasError?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  modalTitle?: string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  label,
  placeholder,
  options,
  selectedValue,
  onSelect,
  error,
  hasError = false,
  disabled = false,
  searchable = false,
  modalTitle,
}) => {
  const theme = useTheme();
  const { fontSizeValue } = useFontSize();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const selectedOption = options.find(option => option.value === selectedValue);

  const filteredOptions = searchable
    ? options.filter(
        option =>
          option.label.toLowerCase().includes(searchText.toLowerCase()) ||
          (option.subtitle &&
            option.subtitle.toLowerCase().includes(searchText.toLowerCase())),
      )
    : options;

  const handleSelect = (option: SelectorOption) => {
    onSelect(option);
    setIsModalVisible(false);
    setSearchText('');
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSearchText('');
  };

  const renderOption = ({ item }: { item: SelectorOption }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        { borderBottomColor: theme.dark ? '#494949ff' : '#E0E0E0' },
      ]}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.optionContent}>
        {item.icon && (
          <Icon
            name={item.icon}
            size={20}
            color={theme.dark ? '#FFF' : '#666'}
            style={styles.optionIcon}
          />
        )}
        <View style={styles.optionText}>
          <CustomText fontFamily="Gilroy-Medium" size={16}>
            {item.label}
          </CustomText>
          {item.subtitle && (
            <CustomText
              fontFamily="Gilroy-Regular"
              style={styles.optionSubtitle}
              color={theme.dark ? '#999' : '#666'}
            >
              {item.subtitle}
            </CustomText>
          )}
        </View>
      </View>
      {selectedValue === item.value && (
        <Icon name="check" size={20} color="#4A90E2" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomText fontFamily="Gilroy-Medium" style={styles.label}>
        {label}
      </CustomText>

      <TouchableOpacity
        style={[
          styles.selector,
          hasError && styles.selectorError,
          disabled && styles.selectorDisabled,
          {
            backgroundColor: theme.dark ? theme.colors.card : '#FAFAFA',
            borderColor: theme.dark ? '#494949ff' : '#E0E0E0',
          },
        ]}
        onPress={openModal}
        disabled={disabled}
      >
        <CustomText
          style={[
            styles.selectorText,
            !selectedOption && styles.placeholderText,
            hasError && styles.selectorTextError,
          ]}
          size={16}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </CustomText>
        <Icon
          name="keyboard-arrow-down"
          size={24}
          color={
            hasError
              ? '#E74C3C'
              : disabled
              ? '#CCC'
              : theme.dark
              ? '#999'
              : '#666'
          }
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {error && (
        <CustomText style={styles.errorText} size={12}>
          {error}
        </CustomText>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: theme.dark ? '#494949ff' : '#E0E0E0' },
              ]}
            >
              <CustomText size={18} fontFamily="Gilroy-SemiBold">
                {modalTitle || `Select ${label}`}
              </CustomText>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon
                  name="close"
                  size={24}
                  color={theme.dark ? '#FFF' : '#666'}
                />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View
                style={[
                  styles.searchContainer,
                  { borderBottomColor: theme.dark ? '#494949ff' : '#E0E0E0' },
                ]}
              >
                <Icon
                  name="search"
                  size={20}
                  color={theme.dark ? '#FFF' : '#666'}
                  style={styles.searchIcon}
                />
                <TextInput
                  style={[
                    styles.searchInput,
                    {
                      color: theme.colors.text,
                      fontSize: 16 + fontSizeValue,
                    },
                  ]}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                />
                {/* need to handle font size */}
              </View>
            )}

            <FlatList
              data={filteredOptions}
              renderItem={renderOption}
              keyExtractor={item => item.value}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <CustomText size={16} color={theme.dark ? '#999' : '#666'}>
                    No options found
                  </CustomText>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    // borderColor: ,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    // backgroundColor:,
    height: 50,
  },
  selectorError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  selectorDisabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.6,
  },
  selectorText: {
    // color: '#333',
    flex: 1,
  },
  selectorTextError: {
    color: '#E74C3C',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: '#E74C3C',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    // backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontFamily: 'Gilroy-Medium',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {},
  optionSubtitle: {
    marginTop: 2,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {},
});

export default CustomSelector;
