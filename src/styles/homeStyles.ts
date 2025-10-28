import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    paddingHorizontal: 16,
    paddingTop: 70,
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
});
