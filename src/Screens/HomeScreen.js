import Icon from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.toggleButton}
          onPress={() => navigation.navigate("QrModal")}
          title="Info"
        >
          <Icon name="qrcode" size={25} color="#900" />
        </Pressable>
      ),
    });
  });

  return (
    <View>
      <Text>Hola soy un screen</Text>
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
