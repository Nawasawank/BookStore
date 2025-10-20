import { StyleSheet } from "react-native";

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfcf9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtext: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  form: {
    marginTop: 4,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },
  hint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    marginBottom: 12,
  },
  error: {
    color: "#d9534f",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#854e06ff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#555",
  },
  link: {
    color: "#3b4cca",
    fontWeight: "600",
  },
});
