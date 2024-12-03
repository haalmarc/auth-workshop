import { FormEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8000";

/*
  💡 Refleksjonsspørsmål:
  - Hvorfor kan det å inkludere rolle i JWT være en dårlig ide?

  📖 Lesestoff:
  - https://stackoverflow.com/questions/47224931/is-setting-roles-in-jwt-a-best-practice
*/

function remainingTimeInMinutes(expirationTime?: number): number {
  if (!expirationTime) {
    return 0;
  }

  const msLeft = expirationTime * 1000 - Date.now();
  const inMinutes = Math.floor(msLeft / 60000);

  return Math.max(0, inMinutes);
}

export function Fasit05() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, signOut } = useAuth();
  // ✅ Benytter biblioket jwtDecode for å lese av verdier i JWT
  const decoded = token ? jwtDecode<{ exp: number }>(token) : null;

  const remainingMinutes = remainingTimeInMinutes(decoded?.exp);

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
      <h1>Fasit 5 - JWT-info</h1>
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
      {
        // ✅ Viser minutter igjen av sesjonen
      }
      {!!remainingMinutes && <p>{remainingMinutes} minutter</p>}
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
