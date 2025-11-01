import { StyleSheet } from "react-native";

export const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf4e6", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#3b5ba9", fontSize: 13, marginLeft: 4 },
  clearAll: { color: "#d9534f", fontSize: 13, fontWeight: "600" },
  title: { fontSize: 20, fontWeight: "700", color: "#3c2f2f", marginBottom: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: { width: 70, height: 100, borderRadius: 8 },
  info: { flex: 1, marginLeft: 10, justifyContent: "space-between" },
  bookTitle: { fontSize: 14, fontWeight: "700", color: "#3c2f2f" },
  bookAuthor: { fontSize: 12, color: "#777", marginBottom: 6 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyBox: { backgroundColor: "#f3f3f3", borderRadius: 6, padding: 6 },
  qtyText: { fontSize: 13, fontWeight: "600", color: "#555" },
  priceRow: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: 13, fontWeight: "bold", color: "#a57b18" },

  // Summary
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3c2f2f",
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: { fontSize: 13, color: "#666" },
  summaryValue: { fontSize: 13, color: "#3c2f2f" },
  summaryAccent: { fontSize: 13, color: "#3b5ba9" },
  summaryDivider: {
    borderTopWidth: 1,
    borderColor: "#eee",
    marginVertical: 6,
  },
  summaryTotalLabel: { fontSize: 15, fontWeight: "700" },
  summaryTotal: { fontSize: 15, fontWeight: "700", color: "#3c2f2f" },
  checkoutBtn: {
    backgroundColor: "#3b5ba9",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutText: { color: "#fff", fontWeight: "700", fontSize: 15 },

  // Empty cart
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf4e6",
  },
  emptyText: { marginTop: 10, color: "#777", fontSize: 15 },
  browseBtn: {
    marginTop: 20,
    backgroundColor: "#3b5ba9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
