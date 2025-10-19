import { useState } from "react";
import "./signup.css";
import { api } from "./Api";

export default function SignUp({ onAuthed, goLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!form.agree) return setMsg("Please accept the terms.");
    if (form.password !== form.confirm) return setMsg("Passwords do not match.");

    try {
      setLoading(true);
      // 1) Register
      await api("/api/auth/register", {
        method: "POST",
        body: { name: form.name, email: form.email, password: form.password },
      });

      // 2) Immediately login to get token
      const data = await api("/api/auth/login", {
        method: "POST",
        body: { email: form.email, password: form.password },
      });
      onAuthed(data); // { token, user }
    } catch (err) {
      setMsg(err.message || "Failed to create account.");
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
          {/* …the same UI from before… */}
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-sub">Start your health journey today</p>

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
            <div className="field">
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={6} />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} required minLength={6} />
            </div>

            <label className="agree">
              <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} />
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>

            {msg && <div className="msg">{msg}</div>}

            <button className="submit" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>

            <div className="or"><span/><em>or</em><span/></div>
            <p className="swap">Already have an account? <a href="#" onClick={(e)=>{e.preventDefault(); goLogin();}}>Sign in instead</a></p>
            <p className="secure">🔒 Secured with end-to-end encryption</p>
          </form>
        </section>
      </main>
    </div>
  );
}
