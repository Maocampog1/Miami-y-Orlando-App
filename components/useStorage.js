"use client";
import { useEffect, useState } from "react";

// Guarda datos en el navegador (localStorage). Cada celular tiene sus propios datos.
export function useStorage(key, initial) {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, loaded]);

  return [value, setValue];
}

export const usd = (n) =>
  (Number(n) || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const cop = (n) =>
  "$ " + Math.round(Number(n) || 0).toLocaleString("es-CO") + " COP";

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
