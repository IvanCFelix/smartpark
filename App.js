import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";
import HomeScreen from "./src/Screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import QrModal from "./src/Components/QrModal";
import { createContext, useState } from "react";

export const userContext = createContext();

export default function App() {
  const Stack = createNativeStackNavigator();
  const [userInfo, setUserInfo] = useState(null);
  return (
    <userContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="QrModal" component={QrModal} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
