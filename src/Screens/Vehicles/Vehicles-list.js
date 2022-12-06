import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import VehicleComponent from "../../Components/Vehicle-component";
import { firestoreServices } from "../../Services/firestore-services";

// Context of delete methods
export const deleteContext = createContext(initialDelete);
const initialDelete = false;

const VehiclesList = ({ navigation }) => {
  const [openFab, setOpenFab] = useState(false);
  const [deleteOption, setDeleteOption] = useState(initialDelete);

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getVehicles = async () => {
      const vehicleList = await firestoreServices.getCollection("vehicles");
      setVehicles(vehicleList);
      console.log(vehicleList);
    };
    getVehicles();
  }, []);

  return (
    <deleteContext.Provider value={{ deleteOption, setDeleteOption }}>
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
              onPress: () => {
                setDeleteOption(!deleteOption);
              },
            },
            {
              icon: "plus",
              label: "Agregar",
              style: styles.fab,
              onPress: () => navigation.navigate("VehiclesForm"),
            },
          ]}
          onStateChange={() => setOpenFab(!openFab)}
        />
        {vehicles.map((vehicle) => {
          return <VehicleComponent vehicle={vehicle}></VehicleComponent>;
        })}
      </SafeAreaView>
    </deleteContext.Provider>
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
