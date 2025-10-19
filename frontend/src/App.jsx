import { useState } from "react";
import SignUp from "./Signup.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx"; // simple stub below

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser]   = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [mode, setMode]   = useState("signup"); // "signup" | "login" | "app"

  function onAuthed({ token, user }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setMode("app");
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setMode("login");
  }

  if (!token) {
    return mode === "signup"
      ? <SignUp onAuthed={onAuthed} goLogin={() => setMode("login")} />
      : <Login  onAuthed={onAuthed} goSignup={() => setMode("signup")} />;
  }

  return <Dashboard token={token} user={user} onLogout={logout} />;
}
