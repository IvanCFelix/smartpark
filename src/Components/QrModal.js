import { Button } from "@react-native-material/core";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { userContext } from "../../App";

const QrModal = ({ navigation }) => {
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

  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setUserInfo(data);
      setScanned(true);
      alert(
        `Bar code with type ${type} and data ${userInfo} has been scanned!`
      );
    }
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
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barcodescan}
        />
      </View>

      <Button
        title={"Cancelar"}
        onPress={() => {
          setScanned(false);
          navigation.goBack();
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

    backgroundColor: "red",
  },
});

export default QrModal;
