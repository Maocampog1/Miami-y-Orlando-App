"use client";

const DRIVE_FOLDER_ID = "13PrPSQJmec76paHmIt_Jm4PiWdWBwHnu";
const DRIVE_URL = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}?usp=drive_link`;
const DRIVE_EMBED = `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#list`;

const DATOS = [
  { t: "✈️ Ida", d: "Sáb 5 dic · Medellín 6:10 a.m. → Orlando (MCO) 12:35 p.m. · Avianca, 1 parada" },
  { t: "🏨 Orlando", d: "Wyndham Garden Lake Buena Vista – Disney Springs Area · 1850B Hotel Plaza Blvd, Lake Buena Vista, FL 32830 · Check-in 4 p.m., check-out 11 a.m. · 5 al 8 dic" },
  { t: "🎟️ Disney", d: "2-Day Base Ticket, válido del 6 al 9 dic · Pases en la Wallet (MagicMobile)" },
  { t: "🚄 Tren", d: "Mar 8 dic · Brightline Orlando 7:20 a.m. → MiamiCentral 10:56 a.m. · Vagón 10, asientos 4C y 4D" },
  { t: "🏨 Miami Beach", d: "President Hotel · 1423 Collins Ave, Miami Beach, FL 33139 · Check-in 3 p.m., check-out 11 a.m. · 8 al 10 dic · Desayuno incluido" },
  { t: "✈️ Regreso", d: "Jue 10 dic · Miami (MIA) 6:30 p.m. → Medellín 10:00 p.m. · Avianca directo · Terminal sur, Concourse J" },
];

export default function Documentos() {
  return (
    <section>
      <div className="intro">
        <h2>Mis documentos</h2>
        <p className="muted">Vouchers, tiquetes y reservas en la carpeta de Google Drive.</p>
      </div>

      <a className="btn btn-big" href={DRIVE_URL} target="_blank" rel="noreferrer">
        📁 Abrir carpeta en Google Drive
      </a>

      <div className="card">
        <h3>Vista rápida de la carpeta</h3>
        <p className="muted small">Si aquí sale vacío, abre la carpeta con el botón de arriba (Drive solo deja verla incrustada si la carpeta está compartida con enlace).</p>
        <iframe className="drive" src={DRIVE_EMBED} title="Carpeta de documentos" />
      </div>

      <div className="card">
        <h3>📌 Datos rápidos</h3>
        <ul className="lugares">
          {DATOS.map((x) => (
            <li key={x.t}>
              <b>{x.t}</b>
              <div className="small">{x.d}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
