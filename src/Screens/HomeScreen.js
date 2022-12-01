import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [session, setSession] = useState(null);
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

  useEffect(async () => {
    const data = await AsyncStorage.getItem("session");
    setSession(JSON.parse(data));
    console.log(session);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: 200 }}
        source={require("../../assets/parking-img.jpg")}
      ></Image>
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
