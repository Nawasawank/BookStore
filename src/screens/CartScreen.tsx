import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../components/cartContext";
import { cartStyles as s } from "../styles/cartStyles";
import { Image as ExpoImage } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const navigation = useNavigation();
  const { items, removeFromCart, clearCart } = useCart();

  const cartArray = Object.values(items);
  const subtotal = cartArray.reduce(
    (sum, item) => sum + (item.book.price || 0) * item.qty,
    0
  );

  if (cartArray.length === 0) {
    return (
      <View style={s.emptyContainer}>
        <Ionicons name="cart-outline" size={60} color="#aaa" />
        <Text style={s.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={s.browseBtn}
          onPress={() => navigation.navigate("Home" as never)}
        >
          <Text style={s.browseBtnText}>Browse Books</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={cartArray}
        keyExtractor={(item) => item.book.id}
        renderItem={({ item }) => (
          <View style={s.card}>
            <ExpoImage
              source={{
                uri:
                  item.book.thumbnail ||
                  "https://dummyimage.com/80x100/eeeeee/555555.png&text=No+Image",
              }}
              style={s.image}
              contentFit="cover"
              transition={300}
            />

            <View style={s.info}>
              <Text style={s.bookTitle}>{item.book.title}</Text>
              <Text style={s.bookAuthor}>{item.book.author}</Text>

              <View style={s.controls}>
                <View style={s.qtyBox}>
                  <Text style={s.qtyText}>Qty: {item.qty}</Text>
                </View>

                <View style={s.priceRow}>
                  <Text style={s.price}>
                    {(item.book.price || 0) * item.qty} THB
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "Remove Item",
                        `Remove "${item.book.title}" from cart?`,
                        [
                          { text: "Cancel", style: "cancel" },
                          { text: "Remove", onPress: () => removeFromCart(item.book.id) },
                        ]
                      )
                    }
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color="#d9534f"
                      style={{ marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={s.summaryCard}>
            <Text style={s.summaryTitle}>Order Summary</Text>

            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Subtotal</Text>
              <Text style={s.summaryValue}>{subtotal.toFixed(2)} THB</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Shipping</Text>
              <Text style={s.summaryAccent}>Free</Text>
            </View>
            <View style={s.summaryDivider} />
            <View style={s.summaryRow}>
              <Text style={s.summaryTotalLabel}>Total</Text>
              <Text style={s.summaryTotal}>{subtotal.toFixed(2)} THB</Text>
            </View>

            <TouchableOpacity
              style={s.checkoutBtn}
              onPress={() => navigation.navigate("Checkout" as never)}
            >
              <Text style={s.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}
