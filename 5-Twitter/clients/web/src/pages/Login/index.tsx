import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import twitterLogo from "../../assets/twitter.svg";

import "./login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    },
    [],
  );
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!username) {
        console.log("Name is required");

        return;
      }

      localStorage.setItem("@GoTwitter:username", username);

      history.push("/timeline");
    },
    [username, history],
  );

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="twitter" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
