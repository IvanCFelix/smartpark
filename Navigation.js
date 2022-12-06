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
import VehiclesForm from "./src/Screens/Vehicles/Vehicles-form";
import Payment from "./src/Screens/Payment";
import { MaterialIcons } from "@expo/vector-icons";

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
        name="Inicio"
        component={HomeScreen}
      ></HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen
        name="VehiclesForm"
        component={VehiclesForm}
      ></HomeStackNavigator.Screen>
      <HomeStackNavigator.Group screenOptions={{ presentation: "modal" }}>
        <HomeStackNavigator.Screen
          name="QrModal"
          component={QrModal}
          options={{ headerShown: false }}
        ></HomeStackNavigator.Screen>
      </HomeStackNavigator.Group>
    </HomeStackNavigator.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="home"
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
        name="home"
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
      <Tab.Screen
        name="Mis Pagos"
        component={Payment}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payments" size={24} color="black" />
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
