import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet } from "react-native";
import HomeScreen from "./src/Screens/Home";
import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Pressable
                onPress={() => alert("This is a button!")}
                style={styles.toggleButton}
                title="Info"
              >
                <Icon name="qrcode" size={25} color="#900" />
              </Pressable>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
