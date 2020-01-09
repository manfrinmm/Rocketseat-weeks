import React, { useState } from "react";

import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const { data } = await api.post("sessions", { email });

    //Set user._id in the next requests
    api.defaults.headers["user_id"] = data.user._id;

    //Caso atualize a pagina os dados não são perdidos
    localStorage.setItem("Aircnc@user_id", data.user._id);

    history.push("/Dashboard");
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu e-mail"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </>
  );
}
