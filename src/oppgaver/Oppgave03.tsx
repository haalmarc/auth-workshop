import { FormEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";

const API_URL = "http://localhost:8000";

/*
  👉 Oppgave: Krev at du må være innlogget for å navigere til Oppgave03
  - Naviger tilbake til "/fasit2" hvis ikke innlogget

  💡 Refleksjonsspørsmål:
  - Hvorfor er det ikke nok sikkerhet å bare redirecte brukeren om hen ikke har lov til å besøke en side?

  📖 Lesestoff: 
  - https://medium.com/@shirisha95/react-router-v6-simplified-protected-routes-85b209326a55 
*/

export function Oppgave03() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, signOut } = useAuth();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const token = response.data.token;

      setToken(token);
    } catch (err) {
      console.log(err);
      alert("Logg inn feilet!");
    }
  }

  return (
    <div>
      <h1>Oppgave 3 - Beskyttet rute</h1>
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Passord
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button className="submitButton" type="submit">
          Opprett bruker
        </button>
      </form>

      <h2>Token</h2>
      <p>{token ? token : "Ikke logget inn"}</p>
      <button
        className="submitButton"
        type="button"
        onClick={signOut}
        disabled={!token}
      >
        Logg ut
      </button>
    </div>
  );
}
