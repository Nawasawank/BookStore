import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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
    addToCart(book, n);
    Alert.alert("Added", `${n} × "${book.title}" added to cart.`);
  };

  return (
    <View style={s.container}>

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

      <Text style={s.title}>{book.title}</Text>
      <Text style={s.author}>{book.author}</Text>
      <Text style={s.meta}>Publisher: {book.publisher || "-"}</Text>
      <Text style={s.meta}>ISBN: {book.isbn || "-"}</Text>
      <Text style={s.price}>
        {typeof book.price === "number" ? `${book.price} THB` : "-"}
      </Text>

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
            onPress={() => setQty(String((parseInt(qty, 10) || 0) + 1))}
            style={s.qtyBtn}
          >
            <Text style={s.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={s.addBtn} onPress={handleAddToCart}>
        <Ionicons name="cart" size={18} color="#fff" />
        <Text style={s.addBtnText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
