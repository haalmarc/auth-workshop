import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider as AuthProvider1 } from "./oppgaver/Fasit01-hook.tsx";
import { AuthProvider as AuthProvider2 } from "./oppgaver/Fasit02-hook.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {
          // ✅ Lagt til Provider etter oppgave 1 og 2.
        }
        <AuthProvider2>
          <AuthProvider1>
            <App />
          </AuthProvider1>
        </AuthProvider2>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
