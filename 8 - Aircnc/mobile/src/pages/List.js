import React, { useState, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  AsyncStorage,
  Button,
  ScrollView,
  Alert
} from "react-native";

import socketio from "socket.io-client";

import api from "../services/api";

import logo from "../assets/logo.png";

import SpotList from "../components/SpotList";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("AirCnC@user_id").then(user_id => {
      const socket = socketio("http://192.168.0.101:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("AirCnC@techs").then(data => {
      setTechs(data.split(",").map(tech => tech.trim()));
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView style={styles.scrollView}>
        {techs.map(tech => (
          <SpotList tech={tech} key={tech} />
        ))}
      </ScrollView>
      <Button title="Sair" onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
