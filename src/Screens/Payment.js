import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, update } from "firebase/database";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { firebaseAPP } from "../../firebaseConfig";
import { firestoreServices } from "../Services/firestore-services";

const Payment = () => {
  const [sesion, setSession] = useState(null);
  const [uidParkin, setUid] = useState(null);
  const database = getDatabase(firebaseAPP);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getAsyncStorage();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAsyncStorage();
    setRefreshing(false);
  }, []);

  const getAsyncStorage = async () => {
    const session = await AsyncStorage.getItem("session");
    const uidParking = await AsyncStorage.getItem("parkingID");
    setUid(uidParking);
    setSession(JSON.parse(session));
    console.log(uidParking);
  };

  const paying = async () => {
    const updates = {};
    updates[sesion.path + "/isPaid"] = true;
    updates[sesion.path + "/isOwned"] = false;
    updates[sesion.path + "/timeArrive"] = "null";
    update(ref(database), updates);
    Alert.alert("Pagado");
    setSession(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {sesion ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
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
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#C70039",
  },
});

export default Payment;
