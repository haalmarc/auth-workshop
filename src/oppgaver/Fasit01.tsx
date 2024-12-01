import { FormEvent, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit01-hook";

const API_URL = "http://localhost:8000";

/*
  💡 Refleksjonsspørsmål:
  - For enkelthetens skyld har jeg lagret token i localstorage. 
    Hva er sikkerhetsrisikoen ved det, og hvordan bør du heller lagre tokenet?
  - Lim tokenet inn i https://jwt.io/
    - Hvilken informasjon får du ut av tokenet?
    - Hvorfor står det at signaturen er invalid?

  📖 Lesestoff: 
  - https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81 
*/

export function Fasit01() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, setToken } = useAuth(); // ✅ Bytta lokal state med en hook. Legger også til Provider i main.tsx

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
