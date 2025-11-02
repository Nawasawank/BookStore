import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Image as ExpoImage } from "expo-image";
import { historyStyles as s } from "../styles/historyStyles";

type OrderItem = {
  id: string;
  title: string;
  qty: number;
  price: number | null;
  image_url?: string;
  thumbnail_url?: string;
};

type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
};

export default function HistoryScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ordersRef = ref(db, `orders/${user.uid}`);
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted: Order[] = Object.keys(data).map((key) => ({
          id: key,
          createdAt: data[key].createdAt,
          items: data[key].items,
          subtotal: data[key].subtotal,
        }));
        setOrders(formatted.reverse());
      } else {
        setOrders([]);
      }
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color="#a57b18" />
        <Text style={s.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={s.emptyContainer}>
        <Text style={s.emptyText}>No past orders yet </Text>
      </View>
    );
  }

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={s.orderCard}>
      <Text style={s.orderDate}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>

      {item.items.map((book) => (
        <View key={book.id} style={s.bookRow}>
          <ExpoImage
            source={{
              uri:
                book.thumbnail_url ||
                book.image_url ||
                "https://via.placeholder.com/60",
            }}
            style={s.bookImage}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
          />
          <View style={s.bookInfo}>
            <Text style={s.bookTitle}>
              {book.title} <Text style={s.bookQty}>×{book.qty}</Text>
            </Text>
            <Text style={s.bookPrice}>
              {(book.price ?? 0 * book.qty).toFixed(2)} THB
            </Text>
          </View>
        </View>
      ))}

      <View style={s.line} />
      <Text style={s.total}>Total: {item.subtotal.toFixed(2)} THB</Text>
    </View>
  );

  return (
    <View style={s.container}>

      <FlatList
        data={paginatedOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={s.paginationContainer}>
        <TouchableOpacity
          style={[s.pageButton, currentPage === 1 && s.disabledButton]}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <Text style={s.pageButtonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={s.pageText}>
          Page {currentPage} / {totalPages}
        </Text>

        <TouchableOpacity
          style={[s.pageButton, currentPage === totalPages && s.disabledButton]}
          disabled={currentPage === totalPages}
          onPress={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          <Text style={s.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
