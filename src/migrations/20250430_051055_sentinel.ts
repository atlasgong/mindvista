import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_audit_log_operation" AS ENUM('create', 'read', 'update', 'delete');
  CREATE TABLE IF NOT EXISTS "audit_log" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"operation" "enum_audit_log_operation" NOT NULL,
  	"resource_u_r_l" varchar NOT NULL,
  	"document_id" varchar NOT NULL,
  	"previous_version_id" varchar,
  	"user_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audit_log_id" integer;
  DO $$ BEGIN
   ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "audit_log_user_idx" ON "audit_log" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "audit_log_updated_at_idx" ON "audit_log" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_log_fk" FOREIGN KEY ("audit_log_id") REFERENCES "public"."audit_log"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_audit_log_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_log_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "audit_log" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "audit_log" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audit_log_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_audit_log_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "audit_log_id";
  DROP TYPE "public"."enum_audit_log_operation";`);
}
