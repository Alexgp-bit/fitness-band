export async function POST(req: Request) {
  const body = await req.json();

  const datos = body.datos || [];

  const totalPasos = datos.reduce((acc: number, item: any) => acc + (item.pasos || 0), 0);
  const mediaPasos = datos.length > 0 ? totalPasos / datos.length : 0;
  const mediaSueno =
    datos.length > 0
      ? datos.reduce((acc: number, item: any) => acc + (item.sueno || 0), 0) / datos.length
      : 0;
  const mediaPulso =
    datos.length > 0
      ? datos.reduce((acc: number, item: any) => acc + (item.pulso || 0), 0) / datos.length
      : 0;

  let resumen = "Todavía no hay suficientes datos.";

  if (datos.length > 0) {
    const recomendaciones: string[] = [];

    if (mediaSueno < 7) {
      recomendaciones.push("Estás durmiendo menos de 7 horas de media. Te conviene priorizar recuperación.");
    }

    if (mediaPulso > 60) {
      recomendaciones.push("Tu pulso medio está algo alto. Vigila fatiga, estrés o falta de descanso.");
    }

    if (mediaPasos < 8000) {
      recomendaciones.push("Tu media de pasos está por debajo de 8000. Puedes subir actividad ligera diaria.");
    }

    if (recomendaciones.length === 0) {
      recomendaciones.push("Tus métricas generales se ven bastante equilibradas.");
    }

    resumen =
      `Has enviado ${datos.length} registros. ` +
      `Tus pasos totales son ${totalPasos}. ` +
      `Tu media de pasos es ${mediaPasos.toFixed(0)}. ` +
      `Tu sueño medio es ${mediaSueno.toFixed(1)} horas. ` +
      `Tu pulso medio es ${mediaPulso.toFixed(0)} bpm. ` +
      `Recomendación: ${recomendaciones.join(" ")}`;
  }

  return Response.json({
    ok: true,
    resumen,
  });
}
