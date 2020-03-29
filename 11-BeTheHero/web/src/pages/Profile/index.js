import React, { useState, useEffect } from "react";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import LogoImg from "~/assets/logo.svg";
import api from "~/services/api";

import "./styles.css";

export default function Profile() {
  const ongId = localStorage.getItem("@beTheHero:ongId");
  const ongName = localStorage.getItem("@beTheHero:ongName");

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await api.get("/ongs/incidents", {
        headers: {
          Authorization: ongId,
        },
      });
      setIncidents(data.incidents);
    }

    loadData();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      const arrayIncidents = incidents.filter((incident) => incident.id !== id);

      setIncidents(arrayIncidents);
    } catch (error) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("@beTheHero:ongId");
    localStorage.removeItem("@beTheHero:ongName");

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={LogoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#A8A8B3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
