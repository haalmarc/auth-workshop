import { FormEvent, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000"; // Serverens URL

/*
  👉 Oppgave: Fjern isLoading- sjekken og refresh siden. Hindre kræsj med en ErrorBoundary.

  💡 Refleksjonsspørsmål:
  - Hvorfor kræsjer appen i utgangspunktet?
  - Hva er forskjellen på å sjekke for error i useQuery-tilstanden versus ErrorBoundary?

  📖 Lesestoff: 
  - https://www.brandondail.com/posts/fault-tolerance-react
  - https://legacy.reactjs.org/docs/error-boundaries.html
*/

export function Oppgave01() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (token: string | null) => {
    setToken(token);
    localStorage.setItem("authToken", token || "");
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const token = response.data.token;
      handleLogin(token);
    } catch (err) {
      console.log(err);
      alert("Login failed!");
    }
  }

  return (
    <div>
      <h1>Oppgave 1 - ErrorBoundary</h1>
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

      <Protected token={token} />
    </div>
  );
}

function Protected({ token }) {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Access denied");
    }
  };

  return (
    <div>
      <h2>Protected Page</h2>
      <button onClick={fetchData}>Fetch Protected Data</button>
      {message && <p>{message}</p>}
    </div>
  );
}
