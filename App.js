import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { login, logout } from "./auth";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {!isLoggedIn && (
        <Button
          title="Login"
          onPress={async () => {
            const result = await login();
            Alert.alert(JSON.stringify(result));
            if (result.type === "success") {
              setIsLoggedIn(true);
            }
          }}
        />
      )}
      {isLoggedIn && (
        <Button
          title="Logout"
          onPress={async () => {
            await logout();
            setIsLoggedIn(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
