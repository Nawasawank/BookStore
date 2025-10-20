import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { signUp } from "../services/authService";
import { Ionicons } from "@expo/vector-icons";
import { signupStyles as styles } from "../styles/signupStyles";
import { Alert } from "react-native";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const user = await signUp(email, password);
      Alert.alert(
        "Signup Successful",
        "You can now log in to your account.",
        [{ text: "OK" }]
      );
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.header}>Create an account</Text>
        <Text style={styles.subtext}>Join BookStore and start booking today</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Text style={styles.hint}>Must be at least 8 characters</Text>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create account</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            By signing up, you agree to our <Text style={styles.link}>Terms of Service</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>.
          </Text>

          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.link}>Log in</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
