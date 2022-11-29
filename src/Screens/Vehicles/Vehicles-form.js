import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

const VehiclesForm = () => {
  const [vehicle, setVehicle] = useState({
    model: "",
    brand: "",
    year: "",
    color: "",
    plates: "",
    type: "",
  });

  const years = [];

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        alignContent: "center",
      }}
    >
      <TextInput
        style={style.textInput}
        mode="outlined"
        label="Marca"
        value={vehicle.brand}
        selectionColor="red"
        activeOutlineColor="red"
        onChange=""
      ></TextInput>
      <TextInput
        style={style.textInput}
        mode="outlined"
        label="Modelo"
        value={vehicle.brand}
        selectionColor="red"
        activeOutlineColor="red"
        onChange=""
      ></TextInput>
      <TextInput
        style={style.textInput}
        mode="outlined"
        label="Placas"
        value={vehicle.brand}
        selectionColor="red"
        activeOutlineColor="red"
        onChange=""
      ></TextInput>
      <TextInput
        style={style.textInput}
        mode="outlined"
        label="Año"
        value={vehicle.brand}
        selectionColor="red"
        activeOutlineColor="red"
        onChange=""
      ></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    marginBottom: 10,
    borderBottomColor: "red",
  },
  picker: {
    backgroundColor: "white",
  },
});
export default VehiclesForm;
