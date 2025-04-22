import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_events_v_version_date_ranges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_title_fr" varchar,
  	"version_description" varchar,
  	"version_description_fr" varchar,
  	"version_incentive" varchar,
  	"version_incentive_fr" varchar,
  	"version_limited_availability" boolean,
  	"version_is_chance" boolean,
  	"version_location" varchar,
  	"version_location_fr" varchar,
  	"version_location_link" varchar,
  	"version_sign_up_link" varchar,
  	"version_instagram_post" varchar,
  	"version_graphic_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "events_date_ranges" ALTER COLUMN "start_date" DROP NOT NULL;
  ALTER TABLE "events_date_ranges" ALTER COLUMN "end_date" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "location" DROP NOT NULL;
  ALTER TABLE "events" ADD COLUMN "_status" "enum_events_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_events_v_version_date_ranges" ADD CONSTRAINT "_events_v_version_date_ranges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_graphic_id_media_id_fk" FOREIGN KEY ("version_graphic_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_events_v_version_date_ranges_order_idx" ON "_events_v_version_date_ranges" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_events_v_version_date_ranges_parent_id_idx" ON "_events_v_version_date_ranges" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_date_ranges_start_date_idx" ON "_events_v_version_date_ranges" USING btree ("start_date");
  CREATE INDEX IF NOT EXISTS "_events_v_version_date_ranges_end_date_idx" ON "_events_v_version_date_ranges" USING btree ("end_date");
  CREATE INDEX IF NOT EXISTS "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version_graphic_idx" ON "_events_v" USING btree ("version_graphic_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "events__status_idx" ON "events" USING btree ("_status");`);

    // patch all existing events documents to 'published' to trigger versioning
    try {
        const result = await payload.update({
            collection: "events",
            where: {},
            data: {
                _status: "published",
            },
        });
        console.log(`Successfully patched ${result.docs.length} documents to published status.`);
        console.log("This will trigger the versioning system to populate the versions collection.");
    } catch (error) {
        console.error("Error patching documents during migration:", error);
        throw error;
    }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "_events_v_version_date_ranges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_events_v_version_date_ranges" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP INDEX IF EXISTS "events__status_idx";
  ALTER TABLE "events_date_ranges" ALTER COLUMN "start_date" SET NOT NULL;
  ALTER TABLE "events_date_ranges" ALTER COLUMN "end_date" SET NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "events" ALTER COLUMN "location" SET NOT NULL;
  ALTER TABLE "events" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_status";`);
}
