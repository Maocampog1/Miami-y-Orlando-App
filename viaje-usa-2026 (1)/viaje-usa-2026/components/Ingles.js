"use client";
import { useState } from "react";
import { FRASES } from "../data/frases";

function hablar(texto) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "en-US";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

export default function Ingles() {
  const [abierto, setAbierto] = useState(FRASES[0].tema);

  return (
    <section>
      <div className="intro">
        <h2>Tips para hablar en inglés</h2>
        <p className="muted">Toca 🔊 para escuchar cómo se dice y practicar.</p>
      </div>

      {FRASES.map((grupo) => {
        const open = abierto === grupo.tema;
        return (
          <article key={grupo.tema} className={`dia ${open ? "open" : ""}`}>
            <button className="dia-head" onClick={() => setAbierto(open ? null : grupo.tema)}>
              <span className="dia-title"><strong>{grupo.tema}</strong></span>
              <span className="chev">{open ? "−" : "+"}</span>
            </button>
            {open && (
              <ul className="frases">
                {grupo.frases.map(([en, es]) => (
                  <li key={en}>
                    <button className="speak" onClick={() => hablar(en)} aria-label="Escuchar">🔊</button>
                    <div>
                      <div className="en">{en}</div>
                      <div className="es">{es}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </section>
  );
}
