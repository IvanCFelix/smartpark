import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/Screens/HomeScreen";
import QrModal from "./src/Components/QrModal";
import { createContext, useState } from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

export const userContext = createContext();

export default function App() {
  const Drawer = createDrawerNavigator();

  const [userInfo, setUserInfo] = useState(null);
  return (
    <userContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Inicio" component={HomeScreen} />
          <Drawer.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Drawer.Screen name="Escanear QR" component={QrModal} />
          </Drawer.Group>
        </Drawer.Navigator>
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
