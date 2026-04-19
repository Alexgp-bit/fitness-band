export async function POST(req: Request) {
  const body = await req.json();

  const datos = body.datos || [];

  const totalPasos = datos.reduce((acc: number, item: any) => acc + (item.pasos || 0), 0);
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
    resumen =
      `Has enviado ${datos.length} registros. ` +
      `Tus pasos totales son ${totalPasos}. ` +
      `Tu sueño medio es ${mediaSueno.toFixed(1)} horas. ` +
      `Tu pulso medio es ${mediaPulso.toFixed(0)} bpm.`;
  }

  return Response.json({
    ok: true,
    resumen,
  });
}
