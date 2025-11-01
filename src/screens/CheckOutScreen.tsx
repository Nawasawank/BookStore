import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, push, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, app } from "../config/firebaseConfig";
import { useCart } from "../components/cartContext";
import { checkoutStyles as s } from "../styles/checkOutStyles";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const db = getDatabase(app);
  const { items, clearCart } = useCart();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setFormData((prev) => ({ ...prev, email: user.email || "" }));
      } else {
        Alert.alert("Not Logged In", "Please log in before checking out.");
        navigation.navigate("Login" as never);
      }
    });
    return unsubscribe;
  }, []);

  const handleConfirmOrder = async () => {
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to place an order.");
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.address) {
      Alert.alert("Missing Info", "Please fill in all shipping details.");
      return;
    }

    const cartArray = Object.values(items);
    if (cartArray.length === 0) {
      Alert.alert("Empty Cart", "Add some books before checking out!");
      return;
    }

    const subtotal = cartArray.reduce(
      (sum, item) => sum + (item.book.price || 0) * item.qty,
      0
    );

    try {
      const orderRef = push(ref(db, `orders/${currentUser.uid}`));
      await set(orderRef, {
        userId: currentUser.uid,
        email: currentUser.email,
        shipping: formData,
        items: cartArray.map((item) => ({
          id: item.book.id,
          title: item.book.title,
          qty: item.qty,
          price: item.book.price,
        })),
        subtotal,
        createdAt: new Date().toISOString(),
      });

      clearCart();
      Alert.alert("Success", "Your order has been placed!");
      navigation.navigate("Home" as never);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", "Failed to save your order. Please try again.");
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.header}>Checkout</Text>

      <TextInput
        style={s.input}
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(t) => setFormData({ ...formData, fullName: t })}
      />
      <TextInput
        style={s.input}
        placeholder="Email"
        value={formData.email}
        editable={false}
      />
      <TextInput
        style={s.input}
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(t) => setFormData({ ...formData, phone: t })}
      />
      <TextInput
        style={[s.input, { height: 80 }]}
        multiline
        placeholder="Shipping Address"
        value={formData.address}
        onChangeText={(t) => setFormData({ ...formData, address: t })}
      />

      <TouchableOpacity style={s.confirmBtn} onPress={handleConfirmOrder}>
        <Text style={s.confirmText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
}
