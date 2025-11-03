import React, { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDatabase, ref, push, set, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth, app } from "../config/firebaseConfig";
import { useCart } from "../components/cartContext";
import { checkoutStyles as s } from "../styles/checkOutStyles";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const db = getDatabase(app);
  const { items, clearCart } = useCart();
  const isFocused = useIsFocused();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [alertShown, setAlertShown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isMounted = useRef(true);

  const subtotal = useMemo(
    () =>
      Object.values(items).reduce(
        (sum, item) => sum + (item.book.price || 0) * item.qty,
        0
      ),
    [items]
  );

  useEffect(() => {
    isMounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isMounted.current || !isFocused) return;

      if (user) {
        setCurrentUser(user);
        setFormData((prev) => ({ ...prev, email: user.email || "" }));
        setAlertShown(false);
        setIsLoggingOut(false); 
      } else if (!alertShown && !isLoggingOut) {
        setAlertShown(true);
        Alert.alert("Not Logged In", "Please log in before checking out.", [
          { text: "OK", onPress: () => navigation.navigate("Login" as never) },
        ]);
      }
    });

    return () => {
      isMounted.current = false;
      unsubscribe();
    };
  }, [alertShown, isLoggingOut, isFocused]);


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
          image_url: item.book.thumbnail || null,
        })),
        subtotal,
        createdAt: new Date().toISOString(),
      });

      for (const item of cartArray) {
        const bookQtyRef = ref(db, `books/${item.book.id}/qty`);
        const snapshot = await get(bookQtyRef);

        if (snapshot.exists()) {
          const currentQty = snapshot.val();
          const newQty = Math.max(currentQty - item.qty, 0);
          await update(ref(db, `books/${item.book.id}`), { qty: newQty });
          console.log(`Updated ${item.book.title} → ${newQty} left`);
        } else {
          console.warn(`Book ${item.book.id} has no qty field.`);
        }
      }

      clearCart();
      Alert.alert("Success", "Your order has been placed!");
      navigation.navigate("Home" as never);
    } catch (err: any) {
      console.error("Error saving order:", err);
      Alert.alert("Error", "Failed to save your order. Please try again.");
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.header}>Shipping Information</Text>

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

      <View style={s.summaryContainer}>
        <Text style={s.summaryHeader}>Order Summary</Text>

        {Object.values(items).map((item) => (
          <View key={item.book.id} style={s.summaryItem}>
            <View style={s.summaryInfo}>
              <Text style={s.bookTitle}>{item.book.title}</Text>
              <Text style={s.bookAuthor}>{item.book.author}</Text>
              <Text style={s.bookPrice}>
                {item.book.price?.toFixed(2)} THB × {item.qty}
              </Text>
            </View>
            <Text style={s.bookTotal}>
              {(item.book.price! * item.qty).toFixed(2)} THB
            </Text>
          </View>
        ))}

        <View style={s.summaryLine} />

        <View style={s.summaryRow}>
          <Text style={s.label}>Subtotal</Text>
          <Text style={s.value}>{subtotal.toFixed(2)} THB</Text>
        </View>

        <View style={s.summaryRow}>
          <Text style={s.label}>Shipping</Text>
          <Text style={s.freeText}>Free</Text>
        </View>

        <View style={s.summaryLine} />

        <View style={s.summaryRow}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalValue}>{subtotal.toFixed(2)} THB</Text>
        </View>
      </View>
    </View>
  );
}