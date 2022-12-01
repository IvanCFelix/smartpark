import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const Payment = () => {
  useEffect(async () => {
    const session = await AsyncStorage.getItem("session");
    if (session) {
      getRealTime(session);
    } else {
    }
  }, []);

  const getRealTime = (session) => {
    const parkinsRef = ref(realTime, `${session.url}`);
    onValue(parkinsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
};

export default Payment;
