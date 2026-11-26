"use client";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const entrar = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    setCargando(false);
    if (res.ok) {
      window.location.href = "/";
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo entrar.");
    }
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={entrar}>
        <div className="login-sun" aria-hidden />
        <p className="eyebrow">Orlando · Miami · 5–10 dic 2026</p>
        <h1>Viaje USA 2026 🏰</h1>
        <label>
          Usuario
          <input autoComplete="username" value={user} onChange={(e) => setUser(e.target.value)} />
        </label>
        <label>
          Contraseña
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit" disabled={cargando}>
          {cargando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
