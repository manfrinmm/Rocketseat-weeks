import React, { useState } from "react";

import api from "../../services/api";

import { Container, Input } from "./styles";

import logo from "../../assets/logo.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const { data } = await api.post("devs", {
        username
      });

      // console.log(data);

      setUsername("");

      setLoading(false);

      history.push(`/devs/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Container>
      <img src={logo} alt="tinDev" />
      {error && <h5>Usuário não encontrado</h5>}
      <form onSubmit={handleSubmit} disabled={loading}>
        <Input
          Error={error}
          placeholder="Digite seu usuário do github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando... " : "ENVIAR"}
        </button>
      </form>
    </Container>
  );
}
