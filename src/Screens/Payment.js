import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { firebaseAPP } from "../../firebaseConfig";

const Payment = () => {
  const [sesion, setSession] = useState(null);
  const database = getDatabase(firebaseAPP);

  useEffect(() => {
    const getAsyncStorage = async () => {
      const session = await AsyncStorage.getItem("session");
      setSession(JSON.parse(session));
    };
    getAsyncStorage();
    //getTimeDiference();
  }, []);

  const paying = () => {
    console.log(sesion.path);
    const updates = {};
    updates[sesion.path] = {
      isOwned: false,
      isPaid: true,
      timeArrive: "null",
    };
    update(ref(database), updates);
    // Alert.alert("Pagado");
    setSession(null);
  };

  return (
    <View style={styles.container}>
      {sesion ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
            Sesion Activa
          </Text>
          <View>
            <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
              {`Lote: ${sesion.lote} espacio: ${sesion.space}`}
            </Text>
          </View>
          <Card style={styles.card}>
            <Text style={{ fontSize: 20 }}>Hora de llegada:</Text>
            <Text style={{ fontSize: 30, textAlign: "center" }}>
              {sesion.timeArrive}
            </Text>
          </Card>
          <Pressable style={styles.button} onPress={() => paying()}>
            <Text style={{ color: "white", fontSize: 20 }}>Pagar</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={{ fontSize: 20, marginTop: 50 }}>
          No hay pagos pendientes
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    width: "80%",
    padding: 20,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  button: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#C70039",
  },
});

export default Payment;
