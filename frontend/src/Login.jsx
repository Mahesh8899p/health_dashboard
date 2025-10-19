import { useState } from "react";
import "./signup.css";
import { api } from "./Api";

export default function Login({ onAuthed, goSignup }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]           = useState("");
  const [loading, setLoading]   = useState(false);

  async function submit(e) {
    e.preventDefault(); setMsg("");
    try {
      setLoading(true);
      const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
      onAuthed(data); // { token, user }
    } catch (err) {
      setMsg(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <main className="auth-wrap">
        <section className="auth-card">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-sub">Sign in to continue</p>

          <form className="form" onSubmit={submit}>
            <div className="field">
              <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>

            {msg && <div className="msg">{msg}</div>}

            <button className="submit" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>

            <div className="or"><span/><em>or</em><span/></div>
            <p className="swap">New here? <a href="#" onClick={(e)=>{e.preventDefault(); goSignup();}}>Create an account</a></p>
            <p className="secure">🔒 Secured with end-to-end encryption</p>
          </form>
        </section>
      </main>
    </div>
  );
}
