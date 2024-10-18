import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  // get all tracked searhes
  const { data: searches, error } = await supabase
    .from("searches")
    .select("*")
    .eq("is_tracked", true);

  const res = await Promise.all(
    searches.map((search) =>
      supabase.functions.invoke("scrape-start", {
        body: JSON.stringify({ record: search }),
      })
    ),
  );

  console.log(JSON.stringify(res, null, 2));

  return new Response(JSON.stringify({ ok: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
});

/* To invoke locally:

  --- Remote request

  curl -i --location --request POST 'https://<remotesupabaseprojectid>.supabase.co/functions/v1/scrape-tracked-searches' \
    --header 'Authorization: Bearer anon token' \
    --header 'Content-Type: application/json'

*/
