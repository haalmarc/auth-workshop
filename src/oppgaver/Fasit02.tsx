import { FormEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";

const API_URL = "http://localhost:8000";

/*
  💡 Refleksjonsspørsmål:
  - Hva måtte du ha gjort om du ville ha funksjonalitet for å logge ut fra alle enheter?

  📖 Lesestoff: 
  - https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81 
*/

export function Fasit02() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken, signOut } = useAuth(); // ✅ Henter også ut signOut

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
      <h1>Fasit 2 - Logg ut</h1>
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
