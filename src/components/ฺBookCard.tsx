import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { homeStyles as s } from "../styles/homeStyles";

function BookCard({ item, onPress }: any) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={{ flexBasis: "50%", marginHorizontal: "1%", marginVertical: 5 }}>
      <View style={s.card}>
        <ExpoImage
          source={{
            uri: item.thumbnail || "https://dummyimage.com/200x300/eeeeee/555555.png&text=No+Image",
          }}
          placeholder={{ uri: "https://dummyimage.com/20x30/eeeeee/cccccc.png" }}
          style={s.image}
          contentFit="cover"
          transition={300}
        />
        <Text numberOfLines={2} style={s.title}>{item.title}</Text>
        <Text numberOfLines={1} style={s.author}>{item.author}</Text>
        <Text style={s.price}>
          {typeof item.price === "number" ? `${item.price} THB` : "-"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(BookCard);
