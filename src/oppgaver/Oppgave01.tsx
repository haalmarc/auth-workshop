import { FormEvent, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

/*
  👉 Oppgave: Lag en gjenbrukbar auth-hook
  - Flytt state for token inn i en React Context.
  - lagre token i localstorage, så ved innlastning slipper du å logge inn på nytt

  💡 Refleksjonsspørsmål:
  - Logg inn med en bruker fra `server/index.ts`. 
    Kopier token inn på https://jwt.io/. 
    Hvilken informasjon får du ut av tokenet?
  - Hvorfor lagre en token i React Context, versus andre tilstandsalternativer?

  📖 Lesestoff: 
  - https://react.dev/learn/passing-data-deeply-with-context 
*/

export function Oppgave01() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState<string | null>(null);

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
      <h1>Oppgave 1 - Logg inn</h1>
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
    </div>
  );
}
