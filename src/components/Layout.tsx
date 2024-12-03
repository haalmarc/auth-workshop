import { Outlet, useLocation, useNavigate, NavLink } from "react-router";

// Liste over oppgaver og fasit
const taskList = [
  { path: "/", label: "Oppgave 1" },
  { path: "/fasit1", label: "Fasit 1" },

  { path: "/opg2", label: "Oppgave 2" },
  { path: "/fasit2", label: "Fasit 2" },

  { path: "/opg3", label: "Oppgave 3" },
  { path: "/fasit3", label: "Fasit 3" },

  { path: "/opg4", label: "Oppgave 4" },
  { path: "/fasit4", label: "Fasit 4" },

  { path: "/opg5", label: "Oppgave 5" },
  { path: "/fasit5", label: "Fasit 5" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Finn indeksen til nåværende oppgave eller fasit
  const currentIndex = taskList.findIndex(
    (task) => task.path === location.pathname
  );

  const handleNext = () => {
    if (currentIndex < taskList.length - 1) {
      navigate(taskList[currentIndex + 1].path);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(taskList[currentIndex - 1].path);
    }
  };

  return (
    <div className="layout-container">
      <h1>Auth Workshop</h1>
      <nav>
        <div>
          <ul>
            {taskList.slice(0, 6).map((task, index) => (
              <li key={index}>
                <NavLink
                  to={task.path}
                  style={({ isActive }) => ({
                    textDecoration: isActive ? "underline" : "none",
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                >
                  {task.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {taskList.slice(6).map((task, index) => (
              <li key={index}>
                <NavLink
                  to={task.path}
                  style={({ isActive }) => ({
                    textDecoration: isActive ? "underline" : "none",
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                >
                  {task.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div>
        <button
          className="submitButton"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Forrige Oppgave
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === taskList.length - 1}
        >
          Neste Oppgave
        </button>
      </div>

      <hr />

      <Outlet />
    </div>
  );
}
