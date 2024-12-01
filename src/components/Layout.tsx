import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

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

  { path: "/opg6", label: "Oppgave 6" },
  { path: "/fasit6", label: "Fasit 6" },

  { path: "/opg7", label: "Oppgave 7" },
  { path: "/fasit7", label: "Fasit 7" },
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
      <h1>Error Workshop</h1>
      <nav>
        <div>
          <ul>
            {taskList.slice(0, 6).map((task, index) => (
              <li
                key={index}
                style={{
                  fontWeight:
                    task.path === location.pathname ? "bold" : "normal",
                }}
              >
                <Link
                  to={task.path}
                  style={{
                    textDecoration:
                      task.path === location.pathname ? "underline" : "none",
                  }}
                >
                  {task.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {taskList.slice(6).map((task, index) => (
              <li
                key={index}
                style={{
                  fontWeight:
                    task.path === location.pathname ? "bold" : "normal",
                }}
              >
                <Link
                  to={task.path}
                  style={{
                    textDecoration:
                      task.path === location.pathname ? "underline" : "none",
                  }}
                >
                  {task.label}
                </Link>
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
