import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from "reanimated-color-picker";

const VehiclesForm = () => {
  const [vehicle, setVehicle] = useState({
    model: "",
    brand: "",
    year: "",
    color: "",
    plates: "",
    type: "",
  });

  const handleChange = (value, name) => {
    setVehicle({
      ...vehicle,
      [name]: value,
    });
  };

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
        name="brand"
        label="Marca"
        value={vehicle.brand}
        selectionColor="red"
        activeOutlineColor="red"
        onChangeText={(value) => handleChange(value, "brand")}
      ></TextInput>
      <TextInput
        style={style.textInput}
        mode="outlined"
        label="Modelo"
        name="model"
        value={vehicle.model}
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

      <View style={{ flex: 1, width: 300, height: 100 }}>
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Color:</Text>
        <ColorPicker
          style={{ width: "60%" }}
          value="red"
          onComplete={(hex) => setVehicle({ ...vehicle, color: hex })}
        >
          <Panel1 />
          <HueSlider />
        </ColorPicker>
      </View>
      <Button title="Agregar vehiculo"></Button>
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
