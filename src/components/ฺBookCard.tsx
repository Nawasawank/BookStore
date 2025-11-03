import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { homeStyles as styles } from "../styles/homeStyles";
import type { Book } from "../screens/HomeScreen";

type Props = {
  item: Book;
  onPress: () => void;
};

export default function BookCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{ width: "50%", marginBottom: 5 }}
    >
      <View style={styles.card}>
        <ExpoImage
          source={{
            uri:
              item.thumbnail ||
              "https://dummyimage.com/200x300/eeeeee/555555.png&text=No+Image",
          }}
          style={styles.image}
          contentFit="cover"
          transition={500}
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
        <Text style={styles.isbn}>
            {item.isbn ? `ISBN: ${item.isbn}` : "No ISBN"}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: item.qty && item.qty > 0 ? "#3b5ba9" : "red",
            marginTop: 4,
          }}
        >
          {item.qty && item.qty > 0
            ? `In stock: ${item.qty}`
            : "Out of stock"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}