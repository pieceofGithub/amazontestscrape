alter table "public"."product_search" drop constraint "product_search_asin_fkey";

alter table "public"."product_search" drop constraint "product_search_search_id_fkey";

alter table "public"."products" drop constraint "products_pkey";

alter table "public"."product_search" drop constraint "product_search_pkey";

drop index if exists "public"."products_pkey";

drop index if exists "public"."product_search_pkey";

alter table "public"."product_search" drop column "id";

alter table "public"."product_search" alter column "asin" set not null;

alter table "public"."product_search" alter column "asin" set data type text using "asin"::text;

alter table "public"."product_search" alter column "search_id" set not null;

alter table "public"."products" alter column "asin" drop identity;

alter table "public"."products" alter column "asin" set data type text using "asin"::text;

alter table "public"."products" alter column "final_price" drop default;

CREATE UNIQUE INDEX zortt_pkey ON public.products USING btree (asin);

CREATE UNIQUE INDEX product_search_pkey ON public.product_search USING btree (search_id, asin);

alter table "public"."products" add constraint "zortt_pkey" PRIMARY KEY using index "zortt_pkey";

alter table "public"."product_search" add constraint "product_search_pkey" PRIMARY KEY using index "product_search_pkey";

alter table "public"."product_search" add constraint "product_searches_asin_fkey" FOREIGN KEY (asin) REFERENCES products(asin) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."product_search" validate constraint "product_searches_asin_fkey";

alter table "public"."product_search" add constraint "product_searches_search_id_fkey" FOREIGN KEY (search_id) REFERENCES searches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."product_search" validate constraint "product_searches_search_id_fkey";

CREATE TRIGGER "StartScrapingForNewSearches" AFTER INSERT ON public.searches FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://skirksgvvxktmlahivbj.supabase.co/functions/v1/scrape-start', 'POST', '{"Content-type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraXJrc2d2dnhrdG1sYWhpdmJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODc0Nzc2NSwiZXhwIjoyMDQ0MzIzNzY1fQ.1GBcFiVCnQZ_6TyKzzHlhRU3SfUi4Mz28SeHLAsq10E"}', '{}', '1000');


