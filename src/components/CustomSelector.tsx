import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from './CustomText';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const selectedOption = options.find(option => option.value === selectedValue);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase()) ||
        (option.subtitle && option.subtitle.toLowerCase().includes(searchText.toLowerCase()))
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
      style={styles.optionItem}
      onPress={() => handleSelect(item)}
    >
      <View style={styles.optionContent}>
        {item.icon && (
          <Icon name={item.icon} size={20} color="#666" style={styles.optionIcon} />
        )}
        <View style={styles.optionText}>
          <CustomText fontFamily='Gilroy-Medium' style={styles.optionLabel}>{item.label}</CustomText>
          {item.subtitle && (
            <CustomText fontFamily='Gilroy-Regular' style={styles.optionSubtitle}>{item.subtitle}</CustomText>
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
      <CustomText fontFamily='Gilroy-Medium' style={styles.label}>{label}</CustomText>

      <TouchableOpacity
        style={[
          styles.selector,
          hasError && styles.selectorError,
          disabled && styles.selectorDisabled,
        ]}
        onPress={openModal}
        disabled={disabled}
      >
        <CustomText style={[
          styles.selectorText,
          !selectedOption && styles.placeholderText,
          hasError && styles.selectorTextError,
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </CustomText>
        <Icon 
          name="keyboard-arrow-down" 
          size={24} 
          color={hasError ? '#E74C3C' : disabled ? '#CCC' : '#666'} 
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {error && <CustomText style={styles.errorText}>{error}</CustomText>}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText style={styles.modalTitle}>
                {modalTitle || `Select ${label}`}
              </CustomText>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#999"
                />
              </View>
            )}
            
            <FlatList
              data={filteredOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <CustomText style={styles.emptyText}>No options found</CustomText>
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
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
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
    fontSize: 16,
    color: '#333',
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
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
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
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
    borderBottomColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
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
    borderBottomColor: '#F5F5F5',
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
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default CustomSelector;