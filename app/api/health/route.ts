export async function GET() {
  return Response.json({ ok: true, message: "API de health funcionando" });
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Datos recibidos:", body);

  return Response.json({
    ok: true,
    received: body,
  });
}
