import Icon from "react-native-vector-icons/FontAwesome";
import React, { useLayoutEffect } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { firestoreServices } from "../Services/firestore-services";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.toggleButton}
          onPress={() => navigation.navigate("QrModal")}
          title="Info"
        >
          <Icon name="qrcode" size={25} color="white" />
        </Pressable>
      ),
    });
  });

  return (
    <View>
      <Text>Hola soy un screen</Text>

      <Button title="Hola" onPress={() => show()}>
        Hola
      </Button>
    </View>
  );
};

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

export default HomeScreen;
