import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4e6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  subtext: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#444",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  error: {
    color: "#d9534f",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#a0522d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#666",
    fontSize: 13,
  },
  signupText: {
    marginTop: 8,
    textAlign: "center",
    color: "#666",
    fontSize: 13,
  },
  link: {
    color: "#a0522d",
    fontWeight: "600",
  },
});
