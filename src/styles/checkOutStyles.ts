import { StyleSheet } from "react-native";

export const checkoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3c2f2f",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  confirmBtn: {
    backgroundColor: "#3b5ba9",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  summaryContainer: {
  backgroundColor: "#fff",
  padding: 16,
  borderRadius: 10,
  marginTop: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

summaryHeader: {
  fontSize: 20,
  fontWeight: "600",
  marginBottom: 12,
  color: "#222",
},

summaryItem: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 12,
},

summaryInfo: {
  flexShrink: 1,
},

bookTitle: {
  fontSize: 16,
  fontWeight: "500",
  color: "#222",
},

bookAuthor: {
  fontSize: 14,
  color: "#666",
  marginBottom: 4,
},

bookPrice: {
  fontSize: 14,
  color: "#333",
},

bookTotal: {
  fontSize: 15,
  fontWeight: "500",
  color: "#222",
},

summaryLine: {
  height: 1,
  backgroundColor: "#eee",
  marginVertical: 10,
},

summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 4,
},

label: {
  fontSize: 14,
  color: "#666",
},

value: {
  fontSize: 14,
  color: "#222",
},

freeText: {
  fontSize: 14,
  color: "#007BFF",
  fontWeight: "500",
},

totalLabel: {
  fontSize: 16,
  fontWeight: "600",
  color: "#000",
},

totalValue: {
  fontSize: 16,
  fontWeight: "700",
  color: "#000",
},
});
