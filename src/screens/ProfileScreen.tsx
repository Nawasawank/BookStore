import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { profileStyles as s } from "../styles/profileStyles";

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "User",
        email: currentUser.email,
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been logged out successfully.");
      navigation.navigate("Login" as never);
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleHistory = () => {
    navigation.navigate("History" as never);
  };

  return (
    <View style={s.container}>

      {user && (
        <View style={s.userInfo}>

          <Text style={s.label}>Email</Text>
          <Text style={s.value}>{user.email}</Text>
        </View>
      )}

      <TouchableOpacity style={s.button} onPress={handleHistory}>
        <Text style={s.buttonText}>View Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[s.button, s.logoutBtn]} onPress={handleLogout}>
        <Text style={s.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
