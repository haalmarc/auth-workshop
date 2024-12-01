import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";
import { Outlet, useNavigate } from "react-router";

const API_URL = "http://localhost:8000";

/*
  💡 Refleksjonsspørsmål:
  - Hvilke andre måter enn navigate kan du bruke for å hindre en bruker å besøke en side?
*/

// ✅ Lagt til ProtectedRoute, som benyttes i App.tsx
export const ProtectedRoute = () => {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/fasit2");
    }
  }, [isAuthenticated]);

  return <Outlet />;
};

export function Fasit03() {
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
