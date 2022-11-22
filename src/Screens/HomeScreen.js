import Icon from "react-native-vector-icons/FontAwesome";
import React, { useLayoutEffect } from "react";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import { firestoreServices } from "../Services/firestore-services";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

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
    <View style={styles.container}>
      <Card
        style={{
          width: "100%",
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Bienvenido a SmartParking
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

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
