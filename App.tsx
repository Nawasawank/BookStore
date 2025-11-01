import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

import SignupScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LogInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckOutScreen";
import { CartProvider } from "./src/components/cartContext";
import { RootStackParamList } from "./src/types/navigation";

// Suppress Firestore warnings
LogBox.ignoreLogs(["@firebase/firestore", "WebChannelConnection"]);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookDetail"
            component={BookDetailScreen}
            options={{ title: "Book Details" }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen} 
            options={{ title: "Cart" }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}