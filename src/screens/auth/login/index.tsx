import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Gradients } from "../../../assets/constants/colors";
import CustomInput from "../../../components/customInput";
import GradientButton from "../../../components/gradientButton";
import { getFriendlyAuthError, loginWithEmail } from "../../../services/firebase/auth";

const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

const Login = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";

    if (!password) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    setFormError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await loginWithEmail(email, password);
      // Auth state listener in navigation swaps to the app stack automatically.
    } catch (err: any) {
      setFormError(getFriendlyAuthError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.flexFill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={Gradients.hero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <Image
              source={require("../../../assets/icons/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Welcome back, sign in to continue</Text>
          </LinearGradient>

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          {formError ? <Text style={styles.formError}>{formError}</Text> : null}

          <GradientButton
            title="Login"
            onPress={handleLogin}
            loading={loading}
            icon="arrow-right"
            style={styles.button}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
