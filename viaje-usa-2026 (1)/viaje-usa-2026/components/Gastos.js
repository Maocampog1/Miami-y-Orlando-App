"use client";
import { useState } from "react";
import { DIAS } from "../data/itinerario";
import { useStorage, usd, cop, uid } from "./useStorage";

const CATS = ["Comida", "Transporte", "Compras", "Hotel", "Parques", "Otro"];

export default function Gastos() {
  const [presupuesto, setPresupuesto] = useStorage("presupuesto", { cash: 0, tarjeta: 0 });
  const [gastos, setGastos] = useStorage("gastos", []);
  const [trm] = useStorage("trm", 3300);
  const [form, setForm] = useState({ desc: "", monto: "", metodo: "Efectivo", categoria: "Comida", dia: 1 });

  const agregar = (e) => {
    e.preventDefault();
    const monto = Number(form.monto);
    if (!form.desc.trim() || !monto) return;
    setGastos((xs) => [{ ...form, monto, id: uid(), fecha: new Date().toISOString() }, ...xs]);
    setForm({ ...form, desc: "", monto: "" });
  };
  const borrar = (id) => setGastos((xs) => xs.filter((x) => x.id !== id));

  const gastoCash = gastos.filter((g) => g.metodo === "Efectivo").reduce((s, g) => s + g.monto, 0);
  const gastoTarjeta = gastos.filter((g) => g.metodo === "Tarjeta").reduce((s, g) => s + g.monto, 0);
  const total = gastoCash + gastoTarjeta;
  const cashRestante = (Number(presupuesto.cash) || 0) - gastoCash;
  const tarjetaRestante = (Number(presupuesto.tarjeta) || 0) - gastoTarjeta;

  const porCategoria = CATS.map((c) => ({ c, v: gastos.filter((g) => g.categoria === c).reduce((s, g) => s + g.monto, 0) })).filter((x) => x.v > 0);

  return (
    <section>
      <div className="intro">
        <h2>Gastos</h2>
        <p className="muted">Anota cada gasto en dólares. Todo se convierte a pesos con la tasa de la pestaña Compras ({cop(trm)} por dólar).</p>
      </div>

      <div className="card">
        <h3>💵 Presupuesto (USD)</h3>
        <div className="grid2">
          <label>
            Efectivo que llevamos
            <input type="number" inputMode="decimal" value={presupuesto.cash || ""} placeholder="0" onChange={(e) => setPresupuesto({ ...presupuesto, cash: Number(e.target.value) || 0 })} />
          </label>
          <label>
            Cupo para tarjeta
            <input type="number" inputMode="decimal" value={presupuesto.tarjeta || ""} placeholder="0" onChange={(e) => setPresupuesto({ ...presupuesto, tarjeta: Number(e.target.value) || 0 })} />
          </label>
        </div>
      </div>

      <div className="kpis">
        <div className={`kpi-card ${cashRestante < 0 ? "bad" : ""}`}>
          <small>💵 Efectivo restante</small>
          <b>{usd(cashRestante)}</b>
          <small>{cop(cashRestante * trm)}</small>
        </div>
        <div className={`kpi-card ${tarjetaRestante < 0 ? "bad" : ""}`}>
          <small>💳 Tarjeta disponible</small>
          <b>{usd(tarjetaRestante)}</b>
          <small>gastado {usd(gastoTarjeta)}</small>
        </div>
        <div className="kpi-card wide">
          <small>🧾 Total gastado</small>
          <b>{usd(total)}</b>
          <small>{cop(total * trm)}</small>
        </div>
      </div>

      <form className="card form" onSubmit={agregar}>
        <h3>➕ Nuevo gasto</h3>
        <input placeholder="¿En qué? (ej. Uber al outlet)" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
        <div className="grid2">
          <label>
            Valor (USD)
            <input type="number" inputMode="decimal" placeholder="0" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} />
          </label>
          <label>
            Pago con
            <div className="toggle">
              {["Efectivo", "Tarjeta"].map((m) => (
                <button type="button" key={m} className={form.metodo === m ? "active" : ""} onClick={() => setForm({ ...form, metodo: m })}>
                  {m === "Efectivo" ? "💵" : "💳"} {m}
                </button>
              ))}
            </div>
          </label>
          <label>
            Categoría
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              {CATS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>
            Día
            <select value={form.dia} onChange={(e) => setForm({ ...form, dia: Number(e.target.value) })}>
              {DIAS.map((d) => <option key={d.id} value={d.id}>Día {d.id} · {d.fecha}</option>)}
            </select>
          </label>
        </div>
        <button className="btn" type="submit">Guardar gasto</button>
      </form>

      {porCategoria.length > 0 && (
        <div className="card">
          <h3>📊 Por categoría</h3>
          {porCategoria.map(({ c, v }) => (
            <div className="bar-row" key={c}>
              <span>{c}</span>
              <div className="bar"><div style={{ width: `${Math.max(4, (v / total) * 100)}%` }} /></div>
              <span className="num">{usd(v)}</span>
            </div>
          ))}
        </div>
      )}

      <ul className="lista">
        {gastos.map((g) => (
          <li key={g.id} className="item">
            <div className="item-body">
              <div className="item-top">
                <strong>{g.desc}</strong>
                <b>{usd(g.monto)}</b>
              </div>
              <div className="item-top">
                <small className="muted">
                  {g.metodo === "Efectivo" ? "💵" : "💳"} {g.metodo} · {g.categoria} · Día {g.dia}
                </small>
                <button className="link danger" onClick={() => borrar(g.id)}>Borrar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
