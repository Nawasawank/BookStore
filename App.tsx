import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from 'react-native';
import SignupScreen from "./src/screens/SignUpScreen";
import LoginScreen from "./src/screens/LogInScreen";
import HomeScreen from "./src/screens/HomeScreen";   
import { RootStackParamList } from "./src/types/navigation";

// Suppress Firestore warnings
LogBox.ignoreLogs([
  '@firebase/firestore',
  'WebChannelConnection'
]);

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}