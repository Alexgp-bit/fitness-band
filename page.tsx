"use client";

import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

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
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Fitness AI</h1>

      <button onClick={enviarDatos}>
        Enviar datos de prueba
      </button>

      <pre>{response}</pre>
    </main>
  );
}
