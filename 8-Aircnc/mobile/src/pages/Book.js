import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setError] = useState(false);

  useEffect(() => {
    const id = navigation.getParam("id");
    setId(id);
  }, []);

  async function handleSubmit() {
    setLoading(true);
    setError(false);

    const user_id = await AsyncStorage.getItem("AirCnC@user_id");

    try {
      await api.post(
        `/spots/${id}/bookings`,
        {
          date
        },
        { headers: { user_id } }
      );

      Alert.alert("Solicitação de reserva enviada.");

      setLoading(false);

      navigation.navigate("List");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  async function handelCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      {erro && <Text style={styles.error}>Erro ao enviar reserva.</Text>}
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer resevar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Solcitar reserva</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handelCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  error: {
    textAlign: "center",
    color: "#FF0000",
    fontSize: 18
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30
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
  cancelButton: {
    marginTop: 10,
    backgroundColor: "#ccc"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
