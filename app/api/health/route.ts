import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("health_data")
    .select("*")
    .order("fecha", { ascending: false });

  return Response.json({
    ok: true,
    datos: data || [],
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("health_data")
    .insert([
      {
        pasos: body.pasos,
        sueno: body.sueno,
        pulso: body.pulso,
      },
    ])
    .select();

  if (error) {
    return Response.json({ ok: false, error: error.message });
  }

  return Response.json({
    ok: true,
    inserted: data,
  });
}
