"use client";
import { useEffect, useState } from "react";
import Itinerario from "../components/Itinerario";
import Compras from "../components/Compras";
import Gastos from "../components/Gastos";
import Documentos from "../components/Documentos";
import Ingles from "../components/Ingles";

const TABS = [
  { id: "itinerario", label: "Itinerario", icon: "🗓️", C: Itinerario },
  { id: "compras", label: "Compras", icon: "🛍️", C: Compras },
  { id: "gastos", label: "Gastos", icon: "💰", C: Gastos },
  { id: "docs", label: "Documentos", icon: "📁", C: Documentos },
  { id: "ingles", label: "Inglés", icon: "💬", C: Ingles },
];

function diasFaltantes() {
  const salida = new Date("2026-12-05T06:10:00-05:00");
  const diff = salida.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const [tab, setTab] = useState("itinerario");
  const [faltan, setFaltan] = useState(null);

  useEffect(() => {
    setFaltan(diasFaltantes());
    const guardado = window.location.hash.replace("#", "");
    if (TABS.some((t) => t.id === guardado)) setTab(guardado);
  }, []);

  const cambiar = (id) => {
    setTab(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const salir = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const Actual = TABS.find((t) => t.id === tab).C;

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Orlando · Miami · 5–10 dic 2026</p>
          <h1>Viaje USA 2026 🏰</h1>
          {faltan !== null && (
            <p className="countdown">{faltan > 0 ? `Faltan ${faltan} días ✈️` : faltan === 0 ? "¡Hoy es el día! ✈️" : "¡Buen viaje! 🌴"}</p>
          )}
        </div>
        <button className="logout" onClick={salir}>Salir</button>
      </header>

      <main className="content">
        <Actual />
      </main>

      <nav className="tabbar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => cambiar(t.id)}>
            <span>{t.icon}</span>
            <small>{t.label}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}
