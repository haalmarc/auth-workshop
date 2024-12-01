import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";

const API_URL = "http://localhost:8000";

/*
  👉 Oppgave: Hent data fra et beskyttet API
  - Oppdater fetch-funksjonen, så du sender med token i header

  💡 Refleksjonsspørsmål:
  - Hvordan ville du endret forespørselen om mange forespørsler trengte å være autoriserte?

  📖 Lesestoff:
  - https://www.passportjs.org/concepts/bearer-token/
*/

function ProtectedForm() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/protected`);
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Ikke tillatt");
    }
  };

  return (
    <div>
      <h2>Beskyttet skjema</h2>
      <button onClick={fetchData}>Hent data</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export function Oppgave04() {
  const { token, signOut } = useAuth();

  return (
    <div>
      <h1>Oppgave 4 - Beskyttet API</h1>

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

      <ProtectedForm />
    </div>
  );
}
