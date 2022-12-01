import { Button } from "@react-native-material/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { userContext } from "../../App";
import * as Device from "expo-device";
import { Buffer } from "buffer";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { firebaseAPP } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QrModal = ({ navigation }) => {
  const database = getDatabase(firebaseAPP);
  const { userInfo, setUserInfo } = useContext(userContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    setScanned(false);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    let activeSesion = await AsyncStorage.getItem("session");

    await AsyncStorage.setItem(
      "session",
      JSON.stringify({ metodo: "Entrada", url: data })
    );
    activeSesion = await AsyncStorage.getItem("session");

    updateParkingStatus(activeSesion);
    if (scanned === false) {
      setUserInfo(data);
      setScanned(true);
    }
  };

  const updateParkingStatus = (session) => {
    const sessionJSON = JSON.parse(session);

    const parkinsRef = ref(database, `${sessionJSON.url}`);
    onValue(parkinsRef, (snapshot) => {
      const parkinData = snapshot.val();
      if (sessionJSON.metodo === "Entrada") {
        set(ref(database, sessionJSON.url), {
          ...parkinData,
          scanned: true,
        });
      }
    });
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
          onBarCodeScanned={scanned ? null : handleBarCodeScanned}
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
