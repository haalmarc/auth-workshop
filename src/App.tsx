import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, Navigate } from "react-router";
import { Oppgave01 } from "./oppgaver/Oppgave01";
import { Layout } from "./components/Layout";

import { Fasit01 } from "./oppgaver/Fasit01";
import { Oppgave02 } from "./oppgaver/Oppgave02";
import { Fasit02 } from "./oppgaver/Fasit02";
import { Fasit03, ProtectedRoute } from "./oppgaver/Fasit03";
import { Oppgave03 } from "./oppgaver/Oppgave03";
import { Oppgave04 } from "./oppgaver/Oppgave04";
import { Fasit04 } from "./oppgaver/Fasit04";
/*
import { Oppgave03 } from "./oppgaver/Oppgave03";
import { Fasit03 } from "./oppgaver/Fasit03";
import { Oppgave04 } from "./oppgaver/Oppgave04";
import { Fasit04 } from "./oppgaver/Fasit04";
import { Oppgave05 } from "./oppgaver/Oppgave05";
import { Fasit05 } from "./oppgaver/Fasit05";
import { Oppgave06 } from "./oppgaver/Oppgave06";
import { Fasit06 } from "./oppgaver/Fasit06";
import { Oppgave07 } from "./oppgaver/Oppgave07";
import { Fasit07 } from "./oppgaver/Fasit07";*/

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Oppgave01 />} />
          <Route path="fasit1" element={<Fasit01 />} />

          <Route path="opg2" element={<Oppgave02 />} />
          <Route path="fasit2" element={<Fasit02 />} />

          <Route path="opg3" element={<Oppgave03 />} />

          {
            // ✅ Fasit for oppgave 3:
          }
          <Route element={<ProtectedRoute />}>
            <Route path="fasit3" element={<Fasit03 />} />
          </Route>
          <Route path="opg4" element={<Oppgave04 />} />
          <Route path="fasit4" element={<Fasit04 />} />
          {/*
          <Route path="opg5" element={<Oppgave05 />} />
          <Route path="fasit5" element={<Fasit05 />} />
          <Route path="opg6" element={<Oppgave06 />} />
          <Route path="fasit6" element={<Fasit06 />} />
          <Route path="opg7" element={<Oppgave07 />} />
          <Route path="fasit7" element={<Fasit07 />} />
          */}

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}
