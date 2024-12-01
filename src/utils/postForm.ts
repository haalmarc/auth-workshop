import axios from "axios";

export async function postForm(username: string, password: string) {
  await axios.post(
    "http://localhost:8000/users",
    JSON.stringify({
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export type PostError =
  | "UNKNOWN"
  | "TOO_SHORT_PASSWORD"
  | "MAX_REQUESTS_REACHED";
export async function postFormWithAxiosError(
  username: string,
  password: string,
  requestedError?: PostError // For oppgavens skyld. For å fremprovosere ulike typer feil
) {
  const response = await axios.post("http://localhost:8000/faulty-users", {
    username,
    password,
    requestedError,
  });

  return response.data;
}

export async function fetchUsersWithError(): Promise<User[]> {
  await new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("En feil skjedde")), 2000)
  );

  return new Promise((resolve) =>
    setTimeout(
      () => resolve([{ id: "1", username: "JohnDoe", password: "secret123" }]),
      2000
    )
  );
}

export async function fetchUsersWithAxiosError(): Promise<User[]> {
  const response = await axios.get("http://localhost:8000/faulty-users");

  return response.data;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get("http://localhost:8000/users");

  return response.data;
}

export interface User {
  id: string;
  username: string;
  password: string;
}
export async function fetchFirstUser(): Promise<User> {
  const response = await fetchUsers();
  return response[0];
}

export const queryKeyUsers = ["users"];
