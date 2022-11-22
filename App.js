import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/Screens/HomeScreen";
import { createContext, useState } from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navigation from "./Navigation";

export const userContext = createContext();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  return (
    <userContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      <Navigation></Navigation>
    </userContext.Provider>
  );
}
