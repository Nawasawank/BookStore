import React from "react";
import { StatusBar } from "expo-status-bar";
import SignupScreen from "./src/screens/SignUpScreen";

export default function App() {
  return (
    <>
      <SignupScreen />
      <StatusBar style="auto" />
    </>
  );
}
