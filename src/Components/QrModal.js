import { Button } from "@react-native-material/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { userContext } from "../../App";

import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { firebaseAPP } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firestoreServices } from "../Services/firestore-services";
import { getDoc, updateDoc } from "firebase/firestore";

const QrModal = ({ navigation }) => {
  const database = getDatabase(firebaseAPP);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    const session = await AsyncStorage.getItem("session");
    const id = await AsyncStorage.getItem("parkinID");
    if (session) {
      navigation.goBack();
      Alert.alert("Ya hay una sesion ");
    } else if (id) {
      setScanned(true);
      const parkRef = await firestoreServices.getReferenceById(id, "parkins");
      const payload = {
        isPaid: true,
        isBusy: false,
        actualVehicle: "",
        timeArrive: "null",
      };
      await updateDoc(parkRef, payload);
      AsyncStorage.clear();
      Alert.alert("Ya puedes salir");
      setScanned(false);
      navigation.goBack();
    } else {
      setScanned(true);
      const parkRef = await firestoreServices.getReferenceById(data, "parkins");
      const docData = (await getDoc(parkRef)).data();
      await updateParkingStatus(parkRef, docData);
      const dataUpdated = (await getDoc(parkRef)).data();

      AsyncStorage.setItem("session", JSON.stringify(dataUpdated));
      AsyncStorage.setItem("parkinID", data);

      navigation.goBack();

      Alert.alert(
        "Puedes ingresar:",
        `Lote: ${docData.lote} espacio: ${docData.space}`
      );
    }
  };

  const updateParkingStatus = async (reference, data) => {
    const payload = {
      isPaid: false,
      isBusy: true,
      actualVehicle: "HTTz2YCk7rugye2PZQ2L",
      timeArrive: new Date().toLocaleTimeString(),
    };
    await updateDoc(reference, payload);
    const updates = {};
    updates[data.path + "/isPaid"] = true;
    updates[data.path + "/isOwned"] = false;
    updates[data.path + "/timeArrive"] = "null";
    update(ref(database), updates);
    update(ref(database), updates);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={!scanned && handleBarCodeScanned}
          style={styles.barcodescan}
        />
      </View>

      <Button
        title={"Cancelar"}
        onPress={() => {
          setScanned(false), navigation.goBack();
        }}
        style={styles.btnRScan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 30,
  },
  barcodebox: {
    marginTop: "20%",
    height: 350,
    width: 350,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  barcodescan: {
    width: 400,
    height: 900,
    borderRadius: 30,
  },
  btnRScan: {
    padding: 10,
    paddingHorizontal: 30,
    textAlignVertical: "center",
    textAlign: "center",
    marginTop: 40,

    backgroundColor: "#C70039",
  },
});

export default QrModal;
