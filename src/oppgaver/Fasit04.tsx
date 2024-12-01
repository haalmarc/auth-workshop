import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Fasit02-hook";

const API_URL = "http://localhost:8000";

/*
  💡 Refleksjonsspørsmål:
  - Hvordan ville du endret forespørselen om mange forespørsler trengte å være autoriserte?
  - Hva er forskjellen på interceptors i axios og middleware i Next.js?
  - Hvorfor brukes "Authorization"- header her, og ikke -"Authentication"?

  📖 Lesestoff:
  - https://axios-http.com/docs/interceptors
  - https://nextjs.org/docs/app/building-your-application/authentication#optimistic-checks-with-middleware-optional
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
*/

function ProtectedForm() {
  const { token } = useAuth();
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/protected`, {
        // ✅ Lagt til Autoriserings-header med token-verdien
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage("Ikke tillatt");
    }
  };

  return (
    <div>
      <h2>Skjema</h2>
      <button onClick={fetchData}>Hent data</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export function Fasit04() {
  const { token, signOut } = useAuth();

  return (
    <div>
      <h1>Fasit 4 - Beskyttet API</h1>

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
