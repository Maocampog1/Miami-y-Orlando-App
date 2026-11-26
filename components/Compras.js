"use client";
import { useState } from "react";
import { LUGARES, CATEGORIAS, PERSONAS, WISHLIST_BASE } from "../data/compras";
import { useStorage, usd, cop, uid } from "./useStorage";

const vacio = { para: PERSONAS[0], nombre: "", categoria: CATEGORIAS[0], lugar: LUGARES[0].nombre, precioUsd: "", precioCop: "", nota: "" };

export default function Compras() {
  const [items, setItems] = useStorage("wishlist_v2", WISHLIST_BASE.map((x) => ({ ...x, comprado: false })));
  const [trm, setTrm] = useStorage("trm", 3300);
  const [form, setForm] = useState(vacio);
  const [persona, setPersona] = useState("Todos");
  const [lugar, setLugar] = useState("Todos");
  const [mostrarForm, setMostrarForm] = useState(false);

  const tasaDe = (l) => LUGARES.find((x) => x.nombre === l)?.tax ?? 0.07;

  const agregar = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    setItems((xs) => [{ ...form, id: uid(), comprado: false }, ...xs]);
    setForm({ ...vacio, para: form.para, lugar: form.lugar, categoria: form.categoria });
  };

  const actualizar = (id, campo, valor) => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, [campo]: valor } : x)));
  const borrar = (id) => {
    if (window.confirm("¿Borrar este producto de la lista?")) setItems((xs) => xs.filter((x) => x.id !== id));
  };
  const restaurarBase = () => {
    setItems((xs) => {
      const ids = new Set(xs.map((x) => x.id));
      const faltan = WISHLIST_BASE.filter((b) => !ids.has(b.id)).map((b) => ({ ...b, comprado: false }));
      return [...xs, ...faltan];
    });
  };

  const visibles = items.filter((x) => (persona === "Todos" || x.para === persona) && (lugar === "Todos" || x.lugar === lugar));
  const conPrecio = (x) => (Number(x.precioUsd) || 0) * (1 + tasaDe(x.lugar));
  const pendientes = items.filter((x) => !x.comprado);
  const totalPendiente = pendientes.reduce((s, x) => s + conPrecio(x), 0);
  const comprados = items.filter((x) => x.comprado).length;

  return (
    <section>
      <div className="intro">
        <h2>Compras</h2>
        <p className="muted">
          Wishlist del viaje. El precio en USA se calcula <b>con impuesto</b> (≈6,5% Orlando, ≈7% Miami) y la tasa de cambio que pongas. Toca un precio para editarlo.
        </p>
      </div>

      <div className="card row">
        <label>
          Dólar hoy (COP)
          <input type="number" inputMode="decimal" value={trm} onChange={(e) => setTrm(Number(e.target.value) || 0)} />
        </label>
        <div className="kpi">
          <small>{comprados} de {items.length} comprados</small>
          <b>{usd(totalPendiente)}</b>
          <small>pendiente · {cop(totalPendiente * trm)}</small>
        </div>
      </div>

      <div className="chips">
        {["Todos", ...PERSONAS].map((p) => (
          <button key={p} className={`chip ${persona === p ? "active" : ""}`} onClick={() => setPersona(p)}>
            {p === "Mamá" ? "👩 " : p === "María" ? "👧 " : p === "Regalos" ? "🎁 " : ""}{p}
            {p !== "Todos" && <span className="chip-count">{items.filter((x) => x.para === p && !x.comprado).length}</span>}
          </button>
        ))}
      </div>
      <div className="chips">
        {["Todos", ...LUGARES.map((l) => l.nombre)].map((l) => (
          <button key={l} className={`chip small-chip ${lugar === l ? "active" : ""}`} onClick={() => setLugar(l)}>
            {l === "Todos" ? "📍 Todas las tiendas" : l}
          </button>
        ))}
      </div>

      {visibles.length === 0 && <p className="muted center">No hay nada con este filtro.</p>}

      <ul className="lista">
        {visibles.map((x) => {
          const usaCop = conPrecio(x) * trm;
          const colCop = Number(x.precioCop) || 0;
          const ahorro = colCop && x.precioUsd ? colCop - usaCop : null;
          const pct = ahorro !== null && colCop ? Math.round((ahorro / colCop) * 100) : null;
          return (
            <li key={x.id} className={`item ${x.comprado ? "done" : ""}`}>
              <button className="check" onClick={() => actualizar(x.id, "comprado", !x.comprado)} aria-label="Marcar como comprado">
                {x.comprado ? "✓" : ""}
              </button>
              <div className="item-body">
                <div className="item-top">
                  <strong>{x.nombre}</strong>
                  <span className={`badge badge-${x.para === "Mamá" ? "mama" : x.para === "María" ? "maria" : "regalo"}`}>{x.para}</span>
                </div>
                <small className="muted">{x.categoria} · 📍 {x.lugar}</small>
                {x.nota && <div className="nota-item">{x.nota}</div>}

                <div className="precios">
                  <label>
                    🇺🇸 USD
                    <input type="number" inputMode="decimal" placeholder="—" value={x.precioUsd} onChange={(e) => actualizar(x.id, "precioUsd", e.target.value)} />
                  </label>
                  <label>
                    🇨🇴 COP
                    <input type="number" inputMode="numeric" placeholder="—" value={x.precioCop} onChange={(e) => actualizar(x.id, "precioCop", e.target.value)} />
                  </label>
                </div>
                <div className="compare">
                  {x.precioUsd && <span>En USA con impuesto: {usd(conPrecio(x))} = {cop(usaCop)}</span>}
                  {ahorro !== null && (
                    <span className={ahorro >= 0 ? "good" : "bad"}>
                      {ahorro >= 0 ? `✨ Ahorran ${cop(ahorro)} (${pct}%)` : `Sale más caro en USA por ${cop(-ahorro)}`}
                    </span>
                  )}
                </div>
                <div className="item-actions">
                  <select value={x.lugar} onChange={(e) => actualizar(x.id, "lugar", e.target.value)}>
                    {LUGARES.map((l) => <option key={l.nombre}>{l.nombre}</option>)}
                  </select>
                  <button className="link danger" onClick={() => borrar(x.id)}>Borrar</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!mostrarForm ? (
        <button className="btn btn-big" onClick={() => setMostrarForm(true)}>➕ Agregar algo a la wishlist</button>
      ) : (
        <form className="card form" onSubmit={agregar}>
          <h3>➕ Agregar a la wishlist</h3>
          <input placeholder="¿Qué quieren comprar?" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <div className="grid2">
            <label>
              Para
              <select value={form.para} onChange={(e) => setForm({ ...form, para: e.target.value })}>
                {PERSONAS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </label>
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
          <div className="grid2">
            <button className="btn" type="submit">Agregar</button>
            <button className="btn btn-light" type="button" onClick={() => setMostrarForm(false)}>Cerrar</button>
          </div>
        </form>
      )}

      <div className="card">
        <h3>📍 Dónde comprar cada cosa</h3>
        <ul className="lugares">
          {LUGARES.filter((l) => l.que).map((l) => (
            <li key={l.nombre}>
              <b>{l.nombre}</b> <small className="muted">{l.dia}</small>
              <div className="small">{l.que}</div>
            </li>
          ))}
        </ul>
        <button className="link" onClick={restaurarBase}>↺ Volver a agregar los productos de la lista base que borré</button>
      </div>
    </section>
  );
}
