import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomInputProps extends TextInputProps {
  label?: string;
  iconName?: string;
  error?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  error,
  hasError = false,
  icon,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, hasError && styles.inputError, style]}>
        {icon ? (
          <>{icon}</>
        ) : (
          <>
            {iconName ? (
              <Icon
                name={iconName ?? 'email'}
                size={20}
                color={hasError ? '#E74C3C' : '#999'}
                style={styles.icon}
              />
            ) : null}
          </>
        )}
        <TextInput
          style={[styles.input, hasError && styles.inputTextError]}
          placeholderTextColor={hasError ? '#E74C3C' : '#999'}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    // borderRadius: 8,
    paddingHorizontal: 12,
    // backgroundColor: '#FAFAFA',
    height: 50,
  },
  inputError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  inputTextError: {
    color: '#E74C3C',
  },
  errorText: {
    fontSize: 12,
    color: '#E74C3C',
    marginTop: 4,
  },
});

export default CustomInput;