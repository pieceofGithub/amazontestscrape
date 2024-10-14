// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

console.log("Hello from Functions!");

// echo '[{"keyword":"telefon","url":"https://www.amazon.com","pages_to_search":1}]' | curl.exe -H "Authorization: Bearer cc6afa4b-7aca-49d0-8e5d-3045eb3b0283" -H "Content-Type: application/json" -d "@-" "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lwdb4vjm1ehb499uxs&limit_multiple_results=10"

Deno.serve(async (req) => {
  const { name } = await req.json();

  const url =
    "https://api.brightdata.com/datasets/v3/trigger?dataset_id=gd_lwdb4vjm1ehb499uxs&limit_multiple_results=10";
  const apiKey = `Bearer ${Deno.env.get("BRIGHT_DATA_API_KEY")}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{
      "keyword": "telefon",
      "url": "https://www.amazon.com",
      "pages_to_search": 1,
    }]),
  });

  const resJson = await res.json();
  console.log(resJson);

  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/scrape-start' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'


  Invoke-RestMethod -Uri 'http://127.0.0.1:54321/functions/v1/scrape-start' -Method Post -Headers @{'Authorization'='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'; 'Content-Type'='application/json'} -Body '{"name":"demir"}'

*/
