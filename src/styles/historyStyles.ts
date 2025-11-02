import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#3a2e1f",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf4e6",
  },
  loadingText: {
    marginTop: 10,
    color: "#a57b18",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf4e6",
  },
  emptyText: {
    fontSize: 18,
    color: "#7b6a46",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  orderDate: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  bookRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bookImage: {
    width: 55,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3a2e1f",
    marginBottom: 4,
  },
  bookQty: {
    fontWeight: "400",
    color: "#7b6a46",
  },
  bookPrice: {
    fontSize: 15,
    color: "#3a2e1f",
  },
  line: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
    color: "#3a2e1f",
  },
  paginationContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 15,
  gap: 20,
},

pageButton: {
  backgroundColor: "#a57b18",
  paddingHorizontal: 18,
  paddingVertical: 8,
  borderRadius: 10,
},

disabledButton: {
  opacity: 0.4,
},

pageButtonText: {
  color: "#fff",
  fontWeight: "bold",
},

pageText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
},

});
