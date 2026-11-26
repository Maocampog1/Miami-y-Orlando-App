"use client";
import { useState } from "react";
import { LUGARES, CATEGORIAS } from "../data/compras";
import { useStorage, usd, cop, uid } from "./useStorage";

const vacio = { nombre: "", categoria: CATEGORIAS[0], lugar: LUGARES[0].nombre, precioUsd: "", precioCop: "", nota: "" };

export default function Compras() {
  const [items, setItems] = useStorage("wishlist", []);
  const [trm, setTrm] = useStorage("trm", 3300);
  const [form, setForm] = useState(vacio);
  const [filtro, setFiltro] = useState("Todos");

  const tasaDe = (lugar) => LUGARES.find((l) => l.nombre === lugar)?.tax ?? 0.07;

  const agregar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setItems((xs) => [{ ...form, id: uid(), comprado: false }, ...xs]);
    setForm({ ...vacio, lugar: form.lugar, categoria: form.categoria });
  };

  const toggle = (id) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, comprado: !x.comprado } : x)));
  const borrar = (id) => setItems((xs) => xs.filter((x) => x.id !== id));

  const visibles = items.filter((x) => filtro === "Todos" || x.lugar === filtro);
  const pendientes = items.filter((x) => !x.comprado);
  const totalPendienteUsd = pendientes.reduce((s, x) => s + (Number(x.precioUsd) || 0) * (1 + tasaDe(x.lugar)), 0);

  return (
    <section>
      <div className="intro">
        <h2>Compras</h2>
        <p className="muted">
          Wishlist con comparación de precios. El precio en USA se calcula <b>con impuesto</b> (≈6,5% Orlando, ≈7% Miami) y la tasa de cambio que pongas.
        </p>
      </div>

      <div className="card row">
        <label>
          Dólar hoy (COP)
          <input type="number" inputMode="decimal" value={trm} onChange={(e) => setTrm(Number(e.target.value) || 0)} />
        </label>
        <div className="kpi">
          <small>Pendiente por comprar</small>
          <b>{usd(totalPendienteUsd)}</b>
          <small>{cop(totalPendienteUsd * trm)}</small>
        </div>
      </div>

      <form className="card form" onSubmit={agregar}>
        <h3>➕ Agregar a la wishlist</h3>
        <input placeholder="¿Qué quieren comprar? (ej. Tenis Nike Air Force 1)" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <div className="grid2">
          <label>
            Categoría
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Dónde buscarlo
            <select value={form.lugar} onChange={(e) => setForm({ ...form, lugar: e.target.value })}>
              {LUGARES.map((l) => <option key={l.nombre}>{l.nombre}</option>)}
            </select>
          </label>
          <label>
            Precio USA (USD)
            <input type="number" inputMode="decimal" placeholder="0" value={form.precioUsd} onChange={(e) => setForm({ ...form, precioUsd: e.target.value })} />
          </label>
          <label>
            Precio Colombia (COP)
            <input type="number" inputMode="numeric" placeholder="0" value={form.precioCop} onChange={(e) => setForm({ ...form, precioCop: e.target.value })} />
          </label>
        </div>
        <input placeholder="Nota (talla, color, para quién…)" value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })} />
        <button className="btn" type="submit">Agregar</button>
      </form>

      <div className="chips">
        {["Todos", ...LUGARES.map((l) => l.nombre)].map((l) => (
          <button key={l} className={`chip ${filtro === l ? "active" : ""}`} onClick={() => setFiltro(l)}>{l}</button>
        ))}
      </div>

      {visibles.length === 0 && <p className="muted center">Todavía no hay nada aquí.</p>}

      <ul className="lista">
        {visibles.map((x) => {
          const usaCop = (Number(x.precioUsd) || 0) * (1 + tasaDe(x.lugar)) * trm;
          const colCop = Number(x.precioCop) || 0;
          const ahorro = colCop && x.precioUsd ? colCop - usaCop : null;
          const pct = ahorro !== null && colCop ? Math.round((ahorro / colCop) * 100) : null;
          return (
            <li key={x.id} className={`item ${x.comprado ? "done" : ""}`}>
              <button className="check" onClick={() => toggle(x.id)} aria-label="Marcar como comprado">{x.comprado ? "✓" : ""}</button>
              <div className="item-body">
                <div className="item-top">
                  <strong>{x.nombre}</strong>
                  <button className="link danger" onClick={() => borrar(x.id)}>Borrar</button>
                </div>
                <small className="muted">{x.categoria} · {x.lugar}{x.nota ? ` · ${x.nota}` : ""}</small>
                <div className="compare">
                  <span>🇺🇸 {x.precioUsd ? `${usd(x.precioUsd)} + imp. = ${cop(usaCop)}` : "—"}</span>
                  <span>🇨🇴 {colCop ? cop(colCop) : "—"}</span>
                  {ahorro !== null && (
                    <span className={ahorro >= 0 ? "good" : "bad"}>
                      {ahorro >= 0 ? `Ahorran ${cop(ahorro)} (${pct}%)` : `Sale más caro en USA por ${cop(-ahorro)}`}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="card">
        <h3>📍 Lugares estratégicos</h3>
        <ul className="lugares">
          {LUGARES.filter((l) => l.que).map((l) => (
            <li key={l.nombre}>
              <b>{l.nombre}</b> <small className="muted">{l.dia}</small>
              <div className="small">{l.que}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
