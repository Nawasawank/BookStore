import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../config/firebaseConfig";
import { homeStyles as styles } from "../styles/homeStyles";

type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  thumbnail: string;
  price: number | null;
  category: string;
};

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const listRef = useRef<FlatList<Book>>(null);

  const goToPage = (next: number) => {
    setPage(next);
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });
  };

  useEffect(() => {
    const rtdb = getDatabase(app);
    const booksRef = ref(rtdb, "books");

    const unsubscribe = onValue(
      booksRef,
      (snapshot) => {
        const raw = snapshot.val() as Record<string, any> | null;

        const list: Book[] = raw
          ? Object.entries(raw).map(([id, b]) => ({
              id,
              title: b.title ?? b.Title ?? "",
              author: b.author ?? b.Author ?? "",
              publisher: b.publisher ?? b.Publisher ?? "",
              isbn: b.isbn ?? b.ISBN ?? "",
              thumbnail: b.image_url ?? b.Thumbnail ?? "",
              price:
                typeof b.price_thb === "number"
                  ? b.price_thb
                  : typeof b.Price === "number"
                  ? b.Price
                  : null,
              category: b.category ?? b.Category ?? "Uncategorized",
            }))
          : [];

        setBooks(list);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.warn("RTDB onValue error:", err?.message ?? err);
        setError("Failed to load books. Please check your connection.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(books.map((b) => b.category || "Uncategorized"));
    return ["all", ...Array.from(cats)];
  }, [books]);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return books.filter((b) => {
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.publisher.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || b.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [books, searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages, searchQuery, selectedCategory]);

  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = filteredBooks.slice(pageStart, pageStart + PAGE_SIZE);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a57b18" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.noBooks}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Discover Your Next Great Read</Text>
      <Text style={styles.subtext}>
        Browse our collection of bestsellers, classics, and hidden gems
      </Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, author, publisher, ISBN..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={Keyboard.dismiss}
          returnKeyType="search"
          autoCapitalize="none"
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat ? styles.categoryButtonActive : undefined,
            ]}
            onPress={() => {
              setSelectedCategory(cat);
              goToPage(1);
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat ? styles.categoryTextActive : undefined,
              ]}
            >
              {cat === "all" ? "All" : cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid with footer pager */}
      {filteredBooks.length === 0 ? (
        <Text style={styles.noBooks}>No books found matching your search.</Text>
      ) : (
        <FlatList
          ref={listRef}
          data={pageItems}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri:
                    item.thumbnail ||
                    "https://dummyimage.com/200x300/eeeeee/555555.png&text=No+Image",
                }}
                style={styles.image}
              />
              <Text numberOfLines={2} style={styles.title}>
                {item.title || "Untitled"}
              </Text>
              <Text numberOfLines={1} style={styles.author}>
                {item.author || "Unknown Author"}
              </Text>
              <Text style={styles.price}>
                {typeof item.price === "number" ? `${item.price} THB` : "-"}
              </Text>
            </View>
          )}
          ListFooterComponent={
            totalPages > 1 ? (
              <View style={{ alignItems: "center", paddingVertical: 16, marginBottom: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <TouchableOpacity
                    onPress={() => goToPage(Math.max(1, page - 1))}
                    disabled={page <= 1}
                    style={[
                      styles.categoryButton,
                      page <= 1 ? { opacity: 0.5 } : undefined, // ✅ no boolean in array
                    ]}
                  >
                    <Text style={styles.categoryText}>Prev</Text>
                  </TouchableOpacity>

                  <Text style={{ fontWeight: "600" }}>
                    Page {page} / {totalPages}
                  </Text>

                  <TouchableOpacity
                    onPress={() => goToPage(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages}
                    style={[
                      styles.categoryButton,
                      page >= totalPages ? { opacity: 0.5 } : undefined, // ✅
                    ]}
                  >
                    <Text style={styles.categoryText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
