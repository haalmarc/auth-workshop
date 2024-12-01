import { FormEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000";

/*
  👉 Oppgave: Dekod JWT-token
  - Bruk jwtDecode for å vise hvor mange minutter som gjenstår av sesjonen til brukeren

  💡 Refleksjonsspørsmål:
  - Hvilke verdier kan du ønske å lagre i JWT?
  - Hva vil skje i denne løsningen om token er utgått, 
    og bruker forespør en API-rute som krever autentisering?

  📖 Lesestoff:
  - https://www.npmjs.com/package/jwt-decode
*/

export function Oppgave05() {
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
      <h1>Oppgave 5 - JWT-info</h1>
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
