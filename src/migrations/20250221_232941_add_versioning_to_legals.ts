import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'contentEditor', 'contentEditorFr');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'contentEditor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"title_fr" varchar,
  	"seo_description" varchar NOT NULL,
  	"seo_description_fr" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "legal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_fr" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_legal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_page_id" integer NOT NULL,
  	"version_content" jsonb NOT NULL,
  	"version_content_fr" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"alt_fr" varchar,
  	"purpose" varchar NOT NULL,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "events_date_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"title_fr" varchar,
  	"description" varchar NOT NULL,
  	"description_fr" varchar,
  	"incentive" varchar,
  	"incentive_fr" varchar,
  	"limited_availability" boolean,
  	"is_chance" boolean,
  	"location" varchar NOT NULL,
  	"location_fr" varchar,
  	"location_link" varchar,
  	"sign_up_link" varchar,
  	"instagram_post" varchar,
  	"graphic_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "clubs_other_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "clubs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"title_fr" varchar,
  	"description" varchar NOT NULL,
  	"description_fr" varchar,
  	"website" varchar,
  	"newsletter" varchar,
  	"email" varchar,
  	"phone_number" varchar,
  	"facebook" varchar,
  	"instagram" varchar,
  	"currently_active" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "clubs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"club_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "resources_insurance_providers_insurance_provider" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"name_fr" varchar,
  	"description" varchar,
  	"description_fr" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "resources_insurance_providers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"title_fr" varchar,
  	"description" varchar NOT NULL,
  	"description_fr" varchar,
  	"website" varchar,
  	"newsletter" varchar,
  	"insurance_details" varchar,
  	"insurance_detail_fr" varchar,
  	"email" varchar,
  	"phone_number" varchar,
  	"location" varchar,
  	"location_fr" varchar,
  	"channel_online" boolean,
  	"channel_telephone" boolean,
  	"channel_in_person" boolean,
  	"on_campus" boolean,
  	"currently_active" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"resource_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "club_tag_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resource_tag_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "club_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "resource_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"pages_id" integer,
  	"legal_id" integer,
  	"media_id" integer,
  	"events_id" integer,
  	"clubs_id" integer,
  	"resources_id" integer,
  	"club_tag_categories_id" integer,
  	"resource_tag_categories_id" integer,
  	"club_tags_id" integer,
  	"resource_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "legal" ADD CONSTRAINT "legal_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_legal_v" ADD CONSTRAINT "_legal_v_parent_id_legal_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_legal_v" ADD CONSTRAINT "_legal_v_version_page_id_pages_id_fk" FOREIGN KEY ("version_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_date_ranges" ADD CONSTRAINT "events_date_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_graphic_id_media_id_fk" FOREIGN KEY ("graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "clubs_other_socials" ADD CONSTRAINT "clubs_other_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "clubs_rels" ADD CONSTRAINT "clubs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "clubs_rels" ADD CONSTRAINT "clubs_rels_club_tags_fk" FOREIGN KEY ("club_tags_id") REFERENCES "public"."club_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resources_insurance_providers_insurance_provider" ADD CONSTRAINT "resources_insurance_providers_insurance_provider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_insurance_providers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resources_insurance_providers" ADD CONSTRAINT "resources_insurance_providers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resources_rels" ADD CONSTRAINT "resources_rels_resource_tags_fk" FOREIGN KEY ("resource_tags_id") REFERENCES "public"."resource_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "club_tags" ADD CONSTRAINT "club_tags_category_id_club_tag_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."club_tag_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "resource_tags" ADD CONSTRAINT "resource_tags_category_id_resource_tag_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."resource_tag_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_fk" FOREIGN KEY ("legal_id") REFERENCES "public"."legal"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_clubs_fk" FOREIGN KEY ("clubs_id") REFERENCES "public"."clubs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk" FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_club_tag_categories_fk" FOREIGN KEY ("club_tag_categories_id") REFERENCES "public"."club_tag_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resource_tag_categories_fk" FOREIGN KEY ("resource_tag_categories_id") REFERENCES "public"."resource_tag_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_club_tags_fk" FOREIGN KEY ("club_tags_id") REFERENCES "public"."club_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resource_tags_fk" FOREIGN KEY ("resource_tags_id") REFERENCES "public"."resource_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "legal_page_idx" ON "legal" USING btree ("page_id");
  CREATE INDEX IF NOT EXISTS "legal_updated_at_idx" ON "legal" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "legal_created_at_idx" ON "legal" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_legal_v_parent_idx" ON "_legal_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_legal_v_version_version_page_idx" ON "_legal_v" USING btree ("version_page_id");
  CREATE INDEX IF NOT EXISTS "_legal_v_version_version_updated_at_idx" ON "_legal_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_legal_v_version_version_created_at_idx" ON "_legal_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_legal_v_created_at_idx" ON "_legal_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_legal_v_updated_at_idx" ON "_legal_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "events_date_ranges_order_idx" ON "events_date_ranges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "events_date_ranges_parent_id_idx" ON "events_date_ranges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "events_date_ranges_start_date_idx" ON "events_date_ranges" USING btree ("start_date");
  CREATE INDEX IF NOT EXISTS "events_date_ranges_end_date_idx" ON "events_date_ranges" USING btree ("end_date");
  CREATE UNIQUE INDEX IF NOT EXISTS "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "events_graphic_idx" ON "events" USING btree ("graphic_id");
  CREATE INDEX IF NOT EXISTS "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "clubs_other_socials_order_idx" ON "clubs_other_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "clubs_other_socials_parent_id_idx" ON "clubs_other_socials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "clubs_slug_idx" ON "clubs" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "clubs_updated_at_idx" ON "clubs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "clubs_created_at_idx" ON "clubs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "clubs_rels_order_idx" ON "clubs_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "clubs_rels_parent_idx" ON "clubs_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "clubs_rels_path_idx" ON "clubs_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "clubs_rels_club_tags_id_idx" ON "clubs_rels" USING btree ("club_tags_id");
  CREATE INDEX IF NOT EXISTS "resources_insurance_providers_insurance_provider_order_idx" ON "resources_insurance_providers_insurance_provider" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resources_insurance_providers_insurance_provider_parent_id_idx" ON "resources_insurance_providers_insurance_provider" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "resources_insurance_providers_order_idx" ON "resources_insurance_providers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "resources_insurance_providers_parent_id_idx" ON "resources_insurance_providers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "resources_slug_idx" ON "resources" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "resources_created_at_idx" ON "resources" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "resources_rels_order_idx" ON "resources_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "resources_rels_parent_idx" ON "resources_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "resources_rels_path_idx" ON "resources_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "resources_rels_resource_tags_id_idx" ON "resources_rels" USING btree ("resource_tags_id");
  CREATE INDEX IF NOT EXISTS "club_tag_categories_updated_at_idx" ON "club_tag_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "club_tag_categories_created_at_idx" ON "club_tag_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "resource_tag_categories_updated_at_idx" ON "resource_tag_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "resource_tag_categories_created_at_idx" ON "resource_tag_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "club_tags_category_idx" ON "club_tags" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "club_tags_updated_at_idx" ON "club_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "club_tags_created_at_idx" ON "club_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "resource_tags_category_idx" ON "resource_tags" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "resource_tags_updated_at_idx" ON "resource_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "resource_tags_created_at_idx" ON "resource_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_legal_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_clubs_id_idx" ON "payload_locked_documents_rels" USING btree ("clubs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resources_id_idx" ON "payload_locked_documents_rels" USING btree ("resources_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_club_tag_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("club_tag_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resource_tag_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("resource_tag_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_club_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("club_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resource_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("resource_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);

    await payload.update({
        collection: "legal",
        where: {},
        data: { _status: "published" },
    });
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "legal" CASCADE;
  DROP TABLE "_legal_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "events_date_ranges" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "clubs_other_socials" CASCADE;
  DROP TABLE "clubs" CASCADE;
  DROP TABLE "clubs_rels" CASCADE;
  DROP TABLE "resources_insurance_providers_insurance_provider" CASCADE;
  DROP TABLE "resources_insurance_providers" CASCADE;
  DROP TABLE "resources" CASCADE;
  DROP TABLE "resources_rels" CASCADE;
  DROP TABLE "club_tag_categories" CASCADE;
  DROP TABLE "resource_tag_categories" CASCADE;
  DROP TABLE "club_tags" CASCADE;
  DROP TABLE "resource_tags" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";`);
}
