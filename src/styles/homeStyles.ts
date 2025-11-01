import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3c2f2f",
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    color: "#6b6b6b",
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    borderColor: "#a57b18",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 4,
  },
  categoryButtonActive: {
    backgroundColor: "#a57b18",
  },
  categoryText: {
    fontSize: 13,
    color: "#a57b18",
  },
  categoryTextActive: {
    color: "#fff",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    color: "#a57b18",
    marginTop: 4,
  },
  noBooks: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  headerBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: "#fdfdf9",
  borderBottomColor: "#ddd",
  borderBottomWidth: 1,
  paddingTop: Platform.OS === "ios" ? 50 : 30,
},

logoSection: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},

logoText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#000",
},

iconSection: {
  flexDirection: "row",
  alignItems: "center",
  gap: 16,
},
cartIconWrapper: {
  position: "relative",
},
cartBadge: {
  position: "absolute",
  top: -6,
  right: -10,
  backgroundColor: "red",
  borderRadius: 10,
  paddingHorizontal: 5,
  paddingVertical: 1,
  minWidth: 16,
  alignItems: "center",
  justifyContent: "center",
},

cartBadgeText: {
  color: "white",
  fontSize: 10,
  fontWeight: "bold",
},
modalOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 5,
},

sideMenu: {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  width: "70%",
  backgroundColor: "#fff",
  paddingTop: 60,
  paddingHorizontal: 20,
  elevation: 10,
  zIndex: 10,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 2, height: 0 },
  shadowRadius: 4,
},

menuTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 20,
  color: "#3b5ba9",
},
menuItem: {
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},
menuItemActive: {
  backgroundColor: "#f5e7c4",
},
menuItemText: {
  fontSize: 15,
  color: "#333",
},
menuItemTextActive: {
  color: "#a57b18",
  fontWeight: "600",
},
});
