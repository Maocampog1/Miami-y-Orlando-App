# Viaje USA 2026 ✈️

App del viaje a Orlando y Miami (5 al 10 de diciembre de 2026).

Secciones: **Itinerario** (día por día, mapas y presupuesto), **Compras** (wishlist y comparación con precios en Colombia), **Gastos** (efectivo y tarjeta), **Documentos** (carpeta de Drive) e **Inglés** (frases con audio).

## Publicar en Vercel

1. Sube esta carpeta a un repositorio **privado** de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importa el repositorio. Vercel detecta Next.js solo.
3. Dale **Deploy**. No hace falta configurar nada más: el usuario y la contraseña ya están en `lib/auth.js`.

## Probar en tu computador

```bash
npm install
npm run dev
```

Abre http://localhost:3000

> En local el login usa una cookie `secure`, que Chrome sí acepta en `localhost`.

## Cómo funciona

- `middleware.js` bloquea todas las páginas si no hay sesión y manda a `/login`.
- `app/api/login` compara usuario y contraseña con `lib/auth.js` y guarda una cookie por 30 días.
- La wishlist, los gastos y los ✓ del itinerario se guardan en **el navegador de cada celular** (localStorage). No se sincronizan entre celulares.
- Para editar el itinerario, las frases o los lugares: `data/itinerario.js`, `data/frases.js`, `data/compras.js`.
