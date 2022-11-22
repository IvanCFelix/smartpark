import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FAB, Portal, Provider } from "react-native-paper";

const VehiclesList = () => {
  const [openFab, setOpenFab] = useState(false);
  const onStateChange = ({ openFab }) => setOpenFab({ openFab });

  return (
    <SafeAreaView style={styles.container}>
      <FAB.Group
        open={openFab}
        visible
        color="white"
        fabStyle={styles.fab}
        icon={openFab ? "car" : "plus"}
        actions={[
          {
            icon: "delete",
            label: "Eliminar",
            style: styles.fab,
            onPress: () => console.log("Pressed email"),
          },
          {
            icon: "plus",
            label: "Agregar",
            style: styles.fab,
            onPress: () => console.log("Pressed notifications"),
          },
        ]}
        onStateChange={() => setOpenFab(!openFab)}
      />
      <VehicleComponent></VehicleComponent>
    </SafeAreaView>
  );
};

const VehicleComponent = ({ vehicle }) => {
  const changeActiveVechicle = () => {
    return Alert.alert(
      "¿Deseas marcar este vehiculo como activo?",
      "La informacion de tu parking se actualizara",
      [
        { text: "Cancelar" },
        {
          text: "Aceptar",
          onPress: () => {
            console.log("pressed");
          },
        },
      ]
    );
  };
  return (
    <TouchableOpacity
      style={{
        height: 100,
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",
        borderWidth: 1,
        padding: 10,
        borderColor: "#DCDCDC",
      }}
      onLongPress={() => changeActiveVechicle()}
    >
      <View
        style={{
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#DCDCDC",
          padding: 10,
          marginRight: 20,
        }}
      >
        <FontAwesome5 name="car-side" size={55} color="white" />
      </View>
      <View style={{ width: "auto", height: "100%", flexDirection: "column" }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Mazda Mazda3</Text>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>Año: 2010</Text>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>
          Placas: VGR-102-HJ
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "green", fontSize: 14 }}>
          <FontAwesome5 name="dot-circle" size={14} color={"green"} /> Activo
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  toggleButton: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    backgroundColor: "#C70039",

    tintColor: "white",
  },
});

export default VehiclesList;
