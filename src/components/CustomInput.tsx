import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from './CustomText';
import useTheme from '../theme/useTheme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  iconName?: string;
  error?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  bgColor?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  iconName,
  error,
  hasError = false,
  icon,
  style,
  bgColor,
  ...props
}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {label ? (
        <CustomText
          style={styles.label}
          color={theme.dark ? '#e2e2e2' : '#333'}
        >
          {label}
        </CustomText>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          props.multiline && styles.inputContainerMultiline,
          hasError && styles.inputError,

          {
            backgroundColor: bgColor,
            borderColor: theme.dark ? '#494949ff' : '#E0E0E0',
          },
          style,
        ]}
      >
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
          style={[
            styles.input,
            props.multiline && styles.multilineInput,
            hasError && styles.inputTextError,
            {
              color: theme.dark ? '#efefefff' : '#333',
              fontFamily: 'Gilroy-Medium',
            },
          ]}
          placeholderTextColor={hasError ? '#E74C3C' : '#999'}
          {...props}
        />
      </View>
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
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
  inputContainerMultiline: {
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  multilineInput: {
    textAlignVertical: 'top',
    paddingTop: 0,
  },
});

export default CustomInput;
