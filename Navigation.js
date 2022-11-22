import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import HomeScreen from "./src/Screens/HomeScreen";
import { createContext, useState } from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VehiclesList from "./src/Screens/Vehicles/Vehicles-list";
import { Entypo } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrModal from "./src/Components/QrModal";

const HomeStackNavigator = createNativeStackNavigator();

function Stack() {
  return (
    <HomeStackNavigator.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: "#C70039" },
        headerTintColor: "white",
      }}
    >
      <HomeStackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
      ></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen
        name="QrModal"
        component={QrModal}
        options={{ headerShown: false }}
      ></HomeStackNavigator.Screen>
    </HomeStackNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarActiveTintColor: "#C70039",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#C70039" },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
        name="Inicio"
        component={Stack}
      ></Tab.Screen>
      <Tab.Screen
        name="Mis Vehiculos"
        component={VehiclesList}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="list" size={24} color={color} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
