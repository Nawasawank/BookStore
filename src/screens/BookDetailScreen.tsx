import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { useCart } from "../components/cartContext";
import { bookDetailStyles as s } from "../styles/bookDetailStyles";

type DetailRoute = RouteProp<RootStackParamList, "BookDetail">;
type DetailNav = StackNavigationProp<RootStackParamList, "BookDetail">;

export default function BookDetailScreen() {
  const route = useRoute<DetailRoute>();
  const navigation = useNavigation<DetailNav>();
  const { book } = route.params;
  const [qty, setQty] = useState("1");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const n = parseInt(qty, 10);
    if (!Number.isFinite(n) || n <= 0) {
      Alert.alert("Invalid quantity", "Please enter a positive number.");
      return;
    }

    if (book.qty !== undefined && n > book.qty) {
      Alert.alert(
        "Not enough stock",
        `Only ${book.qty} copies of "${book.title}" are available.`
      );
      return;
    }

    addToCart(book, n);
    Alert.alert("Added", `${n} × "${book.title}" added to cart.`);
  };

  return (
    <ScrollView
      style={s.container}
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Cover */}
      <ExpoImage
        source={{
          uri:
            book.thumbnail ||
            "https://dummyimage.com/200x300/eeeeee/555555.png&text=No+Image",
        }}
        placeholder={{ uri: "https://dummyimage.com/20x30/eeeeee/cccccc.png" }}
        style={s.image}
        contentFit="cover"
        transition={500}
      />

      {/* Book Info */}
      <Text style={s.title}>{book.title}</Text>
      <Text style={s.author}>{book.author}</Text>
      <Text style={s.meta}>Publisher: {book.publisher || "-"}</Text>
      <Text style={s.meta}>ISBN: {book.isbn || "-"}</Text>

      {/* Stock Info */}
      <Text
        style={[
          s.meta,
          { color: book.qty === 0 ? "red" : "#3b5ba9", marginBottom: 4 },
        ]}
      >
        {book.qty === 0
          ? "Out of stock"
          : `In stock: ${book.qty} ${book.qty === 1 ? "copy" : "copies"}`}
      </Text>

      <Text style={s.desription_header}>Description</Text>
      <Text style={s.description}>
        {book.description || "No description available."}
      </Text>

      <Text style={s.price}>
        {typeof book.price === "number" ? `${book.price} THB` : "-"}
      </Text>

      {/* Quantity Selector */}
      <View style={s.qtyRow}>
        <Text style={s.qtyLabel}>Quantity</Text>
        <View style={s.qtyBox}>
          <TouchableOpacity
            onPress={() =>
              setQty(String(Math.max(1, (parseInt(qty, 10) || 1) - 1)))
            }
            style={s.qtyBtn}
          >
            <Text style={s.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={s.qtyInput}
            value={qty}
            onChangeText={setQty}
            keyboardType="number-pad"
          />

          <TouchableOpacity
            onPress={() =>
              setQty(String((parseInt(qty, 10) || 0) + 1))
            }
            style={s.qtyBtn}
          >
            <Text style={s.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={[
          s.addBtn,
          { backgroundColor: book.qty === 0 ? "#ccc" : "#3b5ba9" },
        ]}
        onPress={handleAddToCart}
        disabled={book.qty === 0}
      >
        <Ionicons name="cart" size={18} color="#fff" />
        <Text style={s.addBtnText}>
          {book.qty === 0 ? "Out of Stock" : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}