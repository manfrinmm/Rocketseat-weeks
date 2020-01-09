import React, { useState, useEffect } from "react";
import { Image, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import io from "socket.io-client";

import logo from "../../assets/logo.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import itsamatch from "../../assets/itsamatch.png";

import api from "../../services/api";

import {
  Logo,
  Container,
  Empty,
  CardsContainer,
  Card,
  CardImage,
  CardFooter,
  Name,
  Bio,
  ButtonsContainer,
  Button,
  MatchContainer,
  MatchImage,
  MatchName,
  MatchBio,
  MatchButtonText
} from "./styles";

export default function Main({ navigation }) {
  const id = navigation.getParam("user");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchDev, setmatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const { data } = await api.get("devs", {
        headers: { user: id }
      });

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, [id]);

  async function handleLike() {
    //pega a primeira prosição -> const user = users[0]
    const [user, ...rest] = users;
    await api.post(`devs/${user._id}/likes`, null, {
      headers: { user: id }
    });
    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  useEffect(() => {
    const socket = io("http://192.168.0.101:3000", {
      query: { user: id }
    });

    socket.on("match", dev => {
      setmatchDev(dev);
    });
  }, [id]);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate("Login");
  }

  return (
    <Container>
      <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
        <Logo source={logo} />
      </TouchableOpacity>

      <CardsContainer>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : users.length === 0 ? (
          <Empty>Acabou :(</Empty>
        ) : (
          users.map((user, index) => (
            <Card key={user._id} index={users.length - index}>
              <CardImage
                source={{
                  uri: user.avatar
                }}
              />
              <CardFooter>
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
              </CardFooter>
            </Card>
          ))
        )}
      </CardsContainer>

      {users.length !== 0 && (
        <ButtonsContainer>
          <Button onPress={handleDislike}>
            <Image source={dislike} />
          </Button>
          <Button onPress={handleLike}>
            <Image source={like} />
          </Button>
        </ButtonsContainer>
      )}

      {matchDev && (
        <MatchContainer>
          <Image
            source={itsamatch}
            style={{ height: 60, resizeMode: "contain" }}
          />
          <MatchImage source={{ uri: matchDev.avatar }} />

          <MatchName>{matchDev.name}</MatchName>
          <MatchBio>{matchDev.bio}</MatchBio>

          <TouchableOpacity onPress={() => setmatchDev(null)}>
            <MatchButtonText>FECHAR</MatchButtonText>
          </TouchableOpacity>
        </MatchContainer>
      )}
    </Container>
  );
}
