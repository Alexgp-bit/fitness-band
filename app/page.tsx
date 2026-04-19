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
    setResponse(JSON.stringify(data));
    cargarDatos();
  }

  async function analizarDatos() {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ datos }),
    });

    const data = await res.json();
    setAnalisis(data.resumen || "");
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

      <pre>{response}</pre>

      <h2>Datos guardados</h2>

      {datos.length === 0 ? (
        <p>No hay datos todavía.</p>
      ) : (
        <ul>
          {datos.map((item, index) => (
            <li key={index}>
              pasos: {item.pasos} | sueño: {item.sueno} | pulso: {item.pulso} | fecha: {item.fecha}
            </li>
          ))}
        </ul>
      )}

      <h2>Análisis</h2>
      <p>{analisis || "Todavía no hay análisis."}</p>
    </main>
  );
}
