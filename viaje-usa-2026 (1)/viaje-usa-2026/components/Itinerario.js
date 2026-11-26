"use client";
import { useState } from "react";
import { DIAS, mapsLink, rutaLink } from "../data/itinerario";
import { usd, cop, useStorage } from "./useStorage";

export default function Itinerario() {
  const [abierto, setAbierto] = useState(1);
  const [hechos, setHechos] = useStorage("itinerario_hechos", {});
  const [trm] = useStorage("trm", 3300);

  const toggleHecho = (key) => setHechos((h) => ({ ...h, [key]: !h[key] }));

  const totalViaje = DIAS.reduce((s, d) => s + d.presupuesto.reduce((a, p) => a + p.usd, 0), 0);

  return (
    <section>
      <div className="intro">
        <h2>Itinerario</h2>
        <p className="muted">
          Toca un día para abrirlo. Marca ✓ lo que ya hicieron. Presupuesto estimado de todo el viaje (sin compras):{" "}
          <b>{usd(totalViaje)}</b> · {cop(totalViaje * trm)}
        </p>
      </div>

      {DIAS.map((dia) => {
        const total = dia.presupuesto.reduce((a, p) => a + p.usd, 0);
        const open = abierto === dia.id;
        const ruta = rutaLink(dia.ruta);
        return (
          <article key={dia.id} className={`dia ${open ? "open" : ""}`}>
            <button className="dia-head" onClick={() => setAbierto(open ? null : dia.id)}>
              <span className="dia-emoji">{dia.emoji}</span>
              <span className="dia-title">
                <small>Día {dia.id} · {dia.fecha} · {dia.ciudad}</small>
                <strong>{dia.titulo}</strong>
              </span>
              <span className="chev">{open ? "−" : "+"}</span>
            </button>

            {open && (
              <div className="dia-body">
                {ruta && (
                  <a className="btn btn-map" href={ruta} target="_blank" rel="noreferrer">
                    🗺️ Ver la ruta del día en Google Maps
                  </a>
                )}

                <ol className="timeline">
                  {dia.filas.map((f, i) => {
                    const key = `${dia.id}-${i}`;
                    return (
                      <li key={key} className={hechos[key] ? "done" : ""}>
                        <button className="check" onClick={() => toggleHecho(key)} aria-label="Marcar como hecho">
                          {hechos[key] ? "✓" : ""}
                        </button>
                        <div>
                          <div className="hora">{f.hora}</div>
                          <div className="plan">{f.plan}</div>
                          {f.detalle && <div className="detalle">{f.detalle}</div>}
                          {f.lugar && (
                            <a className="maplink" href={mapsLink(f.lugar)} target="_blank" rel="noreferrer">
                              📍 Abrir en el mapa
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {dia.notas.map((n) => (
                  <div className="nota" key={n.titulo}>
                    <h4>{n.titulo}</h4>
                    <ul>
                      {n.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="nota presupuesto">
                  <h4>💰 Presupuesto estimado del día (las dos)</h4>
                  <table>
                    <tbody>
                      {dia.presupuesto.map((p) => (
                        <tr key={p.concepto}>
                          <td>{p.concepto}</td>
                          <td className="num">{usd(p.usd)}</td>
                        </tr>
                      ))}
                      <tr className="total">
                        <td>Total aprox.</td>
                        <td className="num">
                          {usd(total)}
                          <br />
                          <small>{cop(total * trm)}</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="muted small">
                    Estimado con un plato compartido y Uber compartido. Los Uber cambian según la hora. No incluye compras.
                  </p>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
