import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { deleteContext } from "../Screens/Vehicles/Vehicles-list";

const VehicleComponent = ({ vehicle }) => {
  const { deleteOption, setDeleteOption } = useContext(deleteContext);

  useEffect(() => {
    console.log(deleteOption);
  }, [deleteOption]);

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
      {deleteOption && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable>
            <AntDesign name="minussquareo" size={24} color="red" />
          </Pressable>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VehicleComponent;
