import React, { forwardRef, useState } from "react";
import { KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Colors } from "../../assets/constants/colors";

interface CustomInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  returnKeyType?: "done" | "next" | "go" | "search" | "send";
  onSubmitEditing?: () => void;
}

const CustomInput = forwardRef<React.ComponentRef<typeof TextInput>, CustomInputProps>(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry = false,
      keyboardType = "default",
      autoCapitalize = "none",
      error,
      editable = true,
      multiline = false,
      numberOfLines,
      returnKeyType,
      onSubmitEditing,
    },
    ref,
  ) => {
    const [hideText, setHideText] = useState(secureTextEntry);

    return (
      <View style={styles.wrapper}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View
          style={[
            styles.inputContainer,
            multiline && styles.inputContainerMultiline,
            !!error && styles.inputContainerError,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles.input, multiline && styles.inputMultiline]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.grey}
            secureTextEntry={hideText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? "top" : "center"}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />

          {secureTextEntry && (
            <TouchableOpacity onPress={() => setHideText(!hideText)} hitSlop={10}>
              <Text style={styles.toggleText}>{hideText ? "Show" : "Hide"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  },
);

export default CustomInput;
