import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    padding: 24,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#3a2e1f",
    marginBottom: 30,
    textAlign: "center",
  },
  userInfo: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#7d7d7d",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3a2e1f",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#a57b18",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#a57b18",
  },
  logoutText: {
    color: "#a57b18",
    fontSize: 16,
    fontWeight: "600",
  },
});
