import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("AirCnC@user_id").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setError(false);

    try {
      const { data } = await api.post("/sessions", { email });

      await AsyncStorage.setItem("AirCnC@user_id", data.user._id);
      await AsyncStorage.setItem("AirCnC@techs", techs);

      navigation.navigate("List");
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Image source={logo} />
      <View style={styles.form}>
        {error && <Text style={styles.error}>Erro ao encontar spots</Text>}
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleSubmit}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Encontrar spots</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    textAlign: "center",
    color: "#FF0000"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
