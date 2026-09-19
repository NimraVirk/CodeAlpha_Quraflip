import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "@react-native-firebase/auth";
import styles from "./styles";
import { Colors } from "../../../../assets/constants/colors";
import Icon from "../../../../components/icon";
import CustomInput from "../../../../components/customInput";
import GradientButton from "../../../../components/gradientButton";
import { updateDisplayName } from "../../../../services/firebase/auth";

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const user = getAuth().currentUser;

  const [name, setName] = useState(user?.displayName ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name can't be empty.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await updateDisplayName(name);
      navigation.goBack();
    } catch (err: any) {
      Alert.alert("Couldn't save", err?.message ?? "Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.flexFill} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Icon name="x" size={20} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.content}>
          <CustomInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            autoCapitalize="words"
            error={error}
          />

          <CustomInput label="Email" value={user?.email ?? ""} onChangeText={() => {}} editable={false} />
          <Text style={styles.emailNote}>Email can't be changed here.</Text>
        </View>

        <View style={styles.footer}>
          <GradientButton title="Save Changes" onPress={handleSave} loading={saving} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;
