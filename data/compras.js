export const LUGARES = [
  { nombre: "Orlando Vineland Premium Outlets", dia: "Día 1", que: "Nike, adidas, Columbia Factory Store, Coach Outlet, Tommy Hilfiger y APEX by Sunglass Hut (Ray-Ban). Cuponera VIP y app Simon.", tax: 0.065 },
  { nombre: "Disney Springs", dia: "Día 1", que: "Lego y Disney (World of Disney es la tienda más grande). Muñecos y regalos para niños.", tax: 0.065 },
  { nombre: "Publix", dia: "Día 1", que: "Agua, mecato, chocolates, dulces, vitaminas y snacks para los parques.", tax: 0.065 },
  { nombre: "Parques Disney", dia: "Días 2 y 3", que: "Recuerdos de los parques (más caros).", tax: 0.065 },
  { nombre: "Dolphin Mall", dia: "Día 4", que: "Coach Outlet, Tommy Hilfiger, Columbia, Lids (gorras New Era), Nike, adidas. Zapatos y ropa barata.", tax: 0.07 },
  { nombre: "Sephora", dia: "Días 5 y 6", que: "Hay Sephora en Brickell City Centre y en el Design District (día 5), y en Lincoln Road (día 6).", tax: 0.07 },
  { nombre: "Brickell City Centre", dia: "Día 5", que: "Aritzia, lululemon, Vuori, Zadig & Voltaire, Coach y Sephora.", tax: 0.07 },
  { nombre: "Lincoln Road", dia: "Día 6", que: "Recuerdos de último minuto y Sephora.", tax: 0.07 },
  { nombre: "Otro", dia: "", que: "", tax: 0.07 },
];

export const CATEGORIAS = ["Ropa", "Zapatos", "Accesorios", "Tecnología", "Maquillaje y cuidado", "Salud y vitaminas", "Disney y Lego", "Comida", "Otro"];

export const PERSONAS = ["Mamá", "María", "Regalos"];

// Lista base del viaje. Los precios vienen de los pantallazos (USD = página de USA, COP = precio en Colombia).
export const WISHLIST_BASE = [
  // ---------- Mamá ----------
  { id: "b-m1", para: "Mamá", nombre: "Chaqueta roja corta Tommy Hilfiger (repele el agua)", categoria: "Ropa", lugar: "Dolphin Mall", precioUsd: "", precioCop: "524930", nota: "En Colombia está con 30% off. También hay Tommy en el outlet de Orlando." },
  { id: "b-m2", para: "Mamá", nombre: "Tenis On Cloud", categoria: "Zapatos", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-m3", para: "Mamá", nombre: "Tenis adidas para tía Olga Lucía", categoria: "Zapatos", lugar: "Orlando Vineland Premium Outlets", precioUsd: "", precioCop: "", nota: "adidas Outlet. Llevar la talla de la tía." },
  { id: "b-m4", para: "Mamá", nombre: "Camisetas", categoria: "Ropa", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-m5", para: "Mamá", nombre: "Gafas Ray-Ban Original Wayfarer Classic (Havana, lente gris)", categoria: "Accesorios", lugar: "Orlando Vineland Premium Outlets", precioUsd: "", precioCop: "", nota: "En Colombia no está disponible online. Buscar en APEX by Sunglass Hut." },
  { id: "b-m6", para: "Mamá", nombre: "Chompa", categoria: "Ropa", lugar: "Orlando Vineland Premium Outlets", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-m7", para: "Mamá", nombre: "Gorra New Era LA Dodgers 9FORTY (crema)", categoria: "Accesorios", lugar: "Dolphin Mall", precioUsd: "", precioCop: "151990", nota: "Buscar en Lids." },
  { id: "b-m8", para: "Mamá", nombre: "Chaqueta Columbia Helvetia II Fleece (Red Oxide)", categoria: "Ropa", lugar: "Orlando Vineland Premium Outlets", precioUsd: "63.75", precioCop: "", nota: "Precio web USA en oferta (antes US$85). Columbia Factory Store." },
  { id: "b-m9", para: "Mamá", nombre: "Blusa Tommy Hilfiger", categoria: "Ropa", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-m10", para: "Mamá", nombre: "Vital Proteins (colágeno)", categoria: "Salud y vitaminas", lugar: "Publix", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-m11", para: "Mamá", nombre: "Perfume Emporio Armani \"You\"", categoria: "Maquillaje y cuidado", lugar: "Sephora", precioUsd: "", precioCop: "", nota: "Confirmar el nombre exacto del perfume." },
  { id: "b-m12", para: "Mamá", nombre: "Chocolates (ej. Feastables MrBeast)", categoria: "Comida", lugar: "Publix", precioUsd: "2.60", precioCop: "", nota: "US$2,60 la barra en Walmart, de referencia." },
  { id: "b-m13", para: "Mamá", nombre: "Leggings Nike Universa", categoria: "Ropa", lugar: "Orlando Vineland Premium Outlets", precioUsd: "115", precioCop: "", nota: "En nike.com: extra 25% con código BFRIDAY. Mirar en Nike Factory." },
  { id: "b-m14", para: "Mamá", nombre: "Mini termo Stanley Café-To-Go 12 oz (Purple Dust)", categoria: "Accesorios", lugar: "Otro", precioUsd: "", precioCop: "105000", nota: "" },

  // ---------- María ----------
  { id: "b-a1", para: "María", nombre: "2 pares de tenis", categoria: "Zapatos", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-a2", para: "María", nombre: "Calendario de adviento Sephora", categoria: "Maquillaje y cuidado", lugar: "Sephora", precioUsd: "", precioCop: "", nota: "En diciembre puede estar agotado o rebajado." },
  { id: "b-a3", para: "María", nombre: "Set Laneige Tint & Glow + JuicePop Lip Tint", categoria: "Maquillaje y cuidado", lugar: "Sephora", precioUsd: "31.20", precioCop: "", nota: "Precio web USA en oferta (antes US$39)." },
  { id: "b-a4", para: "María", nombre: "Bolsa mochilera", categoria: "Accesorios", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-a5", para: "María", nombre: "Saco Columbia Timber Meadow Fleece Full Zip (Tobacco)", categoria: "Ropa", lugar: "Orlando Vineland Premium Outlets", precioUsd: "45", precioCop: "", nota: "Precio web USA en oferta (antes US$60). Columbia Factory Store." },
  { id: "b-a6", para: "María", nombre: "Ropa", categoria: "Ropa", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-a7", para: "María", nombre: "Plancha de rulos (rizador automático)", categoria: "Tecnología", lugar: "Otro", precioUsd: "", precioCop: "241704", nota: "Referencia: TSUYAGLA 5 en 1 en Amazon con envío a Colombia. Ojo con el voltaje (110V)." },

  // ---------- Regalos ----------
  { id: "b-r1", para: "Regalos", nombre: "Vitaminas para la abuelita", categoria: "Salud y vitaminas", lugar: "Publix", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-r2", para: "Regalos", nombre: "Bolso para tía Dora (Coach Corner Zip Wristlet)", categoria: "Accesorios", lugar: "Dolphin Mall", precioUsd: "29", precioCop: "", nota: "Precio web Coach Outlet (antes US$88). También hay Coach Outlet en Orlando." },
  { id: "b-r3", para: "Regalos", nombre: "Muñeco para Laura y Nico", categoria: "Disney y Lego", lugar: "Disney Springs", precioUsd: "", precioCop: "", nota: "" },
  { id: "b-r4", para: "Regalos", nombre: "Camisetas baratas o medias para regalar", categoria: "Ropa", lugar: "Dolphin Mall", precioUsd: "", precioCop: "", nota: "Para la familia y gente externa." },
  { id: "b-r5", para: "Regalos", nombre: "Dulces surtidos (paquete 2 lb)", categoria: "Comida", lugar: "Publix", precioUsd: "17.99", precioCop: "", nota: "US$17,99 en Walmart, de referencia." },
];
