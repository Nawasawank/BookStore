import { StyleSheet } from "react-native";

export const bookDetailStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#faf4e6", padding: 20 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },

  backBtn: { padding: 4 },

  headerTitle: { fontSize: 18, fontWeight: "700", color: "#3c2f2f" },

  image: {
    width: 220,
    height: 320,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#3c2f2f",
    textAlign: "center",
    marginBottom: 6,
  },

  author: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 6 },

  meta: { fontSize: 14, color: "#777", textAlign: "center", marginBottom: 2 },

  price: {
    fontSize: 18,
    color: "#a57b18",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },

  qtyRow: { marginTop: 8, alignItems: "center" },

  qtyLabel: { fontSize: 14, color: "#333", marginBottom: 8 },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  qtyBtn: { paddingHorizontal: 14, paddingVertical: 8 },

  qtyBtnText: { fontSize: 18, fontWeight: "700", color: "#333" },

  qtyInput: {
    width: 60,
    height: 40,
    textAlign: "center",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#eee",
    fontSize: 16,
  },

  addBtn: {
    marginTop: 18,
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#3b5ba9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
