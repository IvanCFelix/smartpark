import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const VehiclesList = () => {
  return (
    <View style={styles.container}>
      <Text>Vehiculos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "smokeWhite",
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

export default VehiclesList;
