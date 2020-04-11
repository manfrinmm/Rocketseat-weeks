import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { Container, Itens, Match, MatchImage } from "./styles";

import logo from "../../assets/logo.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import itsamatch from "../../assets/itsamatch.png";

import api from "../../services/api";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchDev, setmatchDev] = useState(null);

  const { id: user } = match.params;

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const { data } = await api.get("devs", {
        headers: { user },
      });

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, [user]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL, {
      query: { user },
    });

    socket.on("match", (dev) => {
      setmatchDev(dev);
    });
  }, [user]);

  async function handleLike(id) {
    await api.post(`devs/${id}/likes`, null, {
      headers: { user },
    });

    setUsers(users.filter((user) => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`devs/${id}/dislikes`, null, {
      headers: { user },
    });

    setUsers(users.filter((user) => user._id !== id));
  }

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="tinDev" />
      </Link>
      {loading ? (
        <div id="aa">Carregando...</div>
      ) : users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <Itens key={user._id}>
              <img src={user.avatar} alt={user.name} />

              <footer>
                <strong>{user.name} </strong>
                <p>{user.bio} </p>
              </footer>
              <div>
                <button onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="dislike" />
                </button>
                <button onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </Itens>
          ))}
        </ul>
      ) : (
        <div>Acabou :(</div>
      )}

      {matchDev && (
        <Match>
          <img src={itsamatch} alt="It's a match" />
          <MatchImage src={matchDev.avatar} alt={matchDev.name} />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="button" onClick={() => setmatchDev(null)}>
            FECHAR
          </button>
        </Match>
      )}
    </Container>
  );
}
