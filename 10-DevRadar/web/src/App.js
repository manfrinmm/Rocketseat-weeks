import "dotenv/config";

import React, { useState, useEffect } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const { data } = await api.get("/devs");

      setDevs(data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(dataForm) {
    const { data } = await api.post("/devs", dataForm);

    setDevs([...devs, data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
