"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [datos, setDatos] = useState<any[]>([]);
  const [analisis, setAnalisis] = useState("");

  async function cargarDatos() {
    const res = await fetch("/api/health");
    const data = await res.json();
    setDatos(data.datos || []);
  }

  async function enviarDatos() {
    const res = await fetch("/api/health", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pasos: 8500,
        sueno: 7.2,
        pulso: 60,
      }),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
    await cargarDatos();
  }

  async function analizarDatos() {
    try {
      setAnalisis("Analizando...");

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ datos }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAnalisis(`Error: ${JSON.stringify(data)}`);
        return;
      }

      setAnalisis(data.resumen || JSON.stringify(data));
    } catch (error: any) {
      setAnalisis(`Error al analizar: ${error?.message || "desconocido"}`);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <main style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Fitness AI</h1>

      <button onClick={enviarDatos}>Enviar datos de prueba</button>
      <button onClick={analizarDatos} style={{ marginLeft: 12 }}>
        Analizar datos
      </button>

      <input
  type="file"
  accept=".csv"
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();

    const lines = text.split("\n").slice(1);

    for (const line of lines) {
      if (!line.trim()) continue;

      const [pasos, sueno, pulso] = line.split(",");

      await fetch("/api/health", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pasos: Number(pasos),
          sueno: Number(sueno),
          pulso: Number(pulso),
        }),
      });
    }

    await cargarDatos();
  }}
/>
      <pre>{response}</pre>

      <h2>Datos guardados</h2>

      {datos.length === 0 ? (
        <p>No hay datos todavía.</p>
      ) : (
        <ul>
          {datos.map((item, index) => (
            <li key={item.id ?? index}>
              pasos: {item.pasos} | sueño: {item.sueno} | pulso: {item.pulso} | fecha: {item.fecha}
            </li>
          ))}
        </ul>
      )}

      <h2>Análisis</h2>
      <pre>{analisis || "Todavía no hay análisis."}</pre>
    </main>
  );
}
