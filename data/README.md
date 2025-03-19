# Local Development Data

This directory contains data files used to seed local development environments.

## Database Dumps

Files ending in `.sql.gz` are PostgreSQL database dumps. The latest file (by timestamp) will be used when running:

```sh
npm run sync:db:dev
```

## S3 Backups

Files ending in `.s3.tar.gz` are S3 bucket backups. The latest file (by timestamp) will be used when running:

```sh
npm run sync:storage:dev
```

### Creating S3 Seed Files (Code Owners Only)

To create a new S3 seed file:

```sh
PROD_S3_BUCKET="bucket-name" \
AWS_ACCESS_KEY_ID="your-access-key" \
AWS_SECRET_ACCESS_KEY="your-secret-key" \
AWS_REGION="region-name" \
tsx scripts/create-s3-seed.ts
```

This requires production S3 access and should only be run by code owners.

## File Naming Convention

Files should follow the format:

- Database: `YYYYMMDDTHHmmssZ.sql.gz` (e.g., 20250316T072456Z.sql.gz)
- S3: `YYYYMMDDTHHmmssZ.s3.tar.gz` (e.g., 20250316T072456Z.s3.tar.gz)

The timestamp format ensures files are sorted correctly when finding the latest version.
