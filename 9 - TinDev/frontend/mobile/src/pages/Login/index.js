import React, { useState, useEffect } from "react";
import { Platform, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";

import { Container, Image, TextInput, Button, ButtonText } from "./styles";

import logo from "../../assets/logo.png";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@tindev:username").then(user => {
      if (user) {
        navigation.navigate("Main", { user });
      }
    });
  }, []);

  async function handleLogin() {
    setLoading(true);
    try {
      const { data } = await api.post("devs", { username });

      const { _id } = data;
      await AsyncStorage.setItem("@tindev:username", _id);

      setLoading(false);

      navigation.navigate("Main", { user: _id });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === "ios"}>
      <Image source={logo} />

      <TextInput
        placeholder="Digite seu usuário do Github"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <Button onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <ButtonText>Entrar</ButtonText>
        )}
      </Button>
    </Container>
  );
}
