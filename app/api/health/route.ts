let datosGuardados: any[] = [];

export async function GET() {
  return Response.json({
    ok: true,
    total: datosGuardados.length,
    datos: datosGuardados,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  datosGuardados.push({
    ...body,
    fecha: new Date().toISOString(),
  });

  return Response.json({
    ok: true,
    received: body,
    total: datosGuardados.length,
  });
}
