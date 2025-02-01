### A Note to Contributors

Please make an effort to follow these guidelines and conventions to help us keep our code and commit history clear and organized. If you have ideas for further improvements, or better conventions, we'd like to hear them :)

Thank you and happy coding!

— Atlas ❤️

# General Guidelines

[Skip to documentation.](#documentation)
New to this repo? See [GUIDE.md](GUIDE.md) to set up your repo.

Please write clear and concise code. Use [Prettier](https://prettier.io/docs/en/) for formatting. Ensure that files are well-commented when necessary.

### Responsiveness

REM is 16px. Do not use any absolute length units. Justification must be provided if you break this rule. Borders excepted.

### Accessibility

We make an attempt to follow [WCAG 2.1 AA standards](https://www.w3.org/TR/WCAG21/).

## Conventional Commit Guidelines

This repository follows modified a [conventional commit](https://www.conventionalcommits.org) guide to keep our commit history clear and structured. Here are the commit types to use:

### Commit Types

| Type       | Description                                                                              | Example                                                       |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `build`    | Changes that affect the build system or dependencies.                                    | `build: update to latest mindfulness package`                 |
| `ci`       | Changes to continuous integration setup, like configuration files.                       | `ci: add deployment workflow for GitHub Actions`              |
| `cms`      | Changes to Payload CMS configuration and the like.                                       | `cms: add new pages collection`                               |
| `merge`    | Represents any `git merge`.                                                              | `merge: branch 'master' into about-page`                      |
| `content`  | Adding, updating, or removing website content (text, images, etc.).                      | `content: update About Us page`                               |
| `feat`     | A new feature or functionality added to the website.                                     | `feat: add search bar to the navigation`                      |
| `fix`      | A bug fix, including broken links, layout issues, or code bugs.                          | `fix: resolve mobile menu not opening on small screens`       |
| `resp`     | Changes to improve responsive design.                                                    | `resp: decrease side margins for smaller devices`             |
| `a11y`     | Accessibility improvements to enhance website usability.                                 | `a11y: add alt text to all homepage images`                   |
| `ui`       | Visual changes to the site’s appearance (e.g., colors, fonts, spacing adjustments).      | `ui: change button color to match theme`                      |
| `ux`       | Changes made to improve user experience (e.g., adding loading states).                   | `ux: add nextjs-toploader`                                    |
| `perf`     | Changes made to improve website performance (e.g., optimizing images or code).           | `perf: lazy-load images on about us page`                     |
| `sec`      | Changes made to fix vulnerabilities or improve security.                                 | `sec: define explicit permissions for github action`          |
| `refactor` | Code restructuring or cleaning that doesn’t change any functionality.                    | `refactor: reorganize header component files`                 |
| `seo`      | Changes to improve search engine optimization.                                           | `seo: update meta descriptions for mental wellness page`      |
| `legal`    | Updates to legal documents, like privacy policies or terms of service.                   | `legal: update privacy policy to include new data use clause` |
| `docs`     | Documentation changes, such as README updates, guidelines, or other informational files. | `docs: add commit guidelines for contributors`                |
| `other`    | If you must...                                                                           | `other: go on a relaxing stroll in outremont`                 |

### Selective Scopes

The `build` type specifically may accept no scope, scope `deps`, or scope `deps-dev`.

### Example Usage

- **Adding a New Page**: `feat: add a contact page with form`
- **Changing Colors on Buttons for Consistency**: `ui: update primary button color across site`
- **Fixing Broken Link**: `fix: correct link in footer to redirect to new policy page`
- **Improving Page Load Speed**: `perf: compress splash images to improve load time`
- **Making Images More Accessible**: `a11y: add captions to staff photos`
- **Updating Privacy Policy**: `legal: update privacy policy to reflect data protection laws`

### General Rules

- **Atomic Commits**: Each commit should represent a single, specific change, to the best of your ability.
- **Message Clarity**: Ensure commit messages clearly state what the change is.
- **Message Length**: Try to limit commit messages to under 50 characters if possible, but do not sacrifice clarity to meet said limit. (some of the examples above use more than 50 characters!)
- **Descriptions**: Descriptions are...a free for all...for right now. Ensure clarity and concision nevertheless.
- **Scope**: Use lowercase, concise scopes if you want to specify a particular section (e.g., `feat(nav): add dropdown menu`).

### Husky

These commit guidelines are remotely enforced and deployment will be blocked if conventions are not adhered to.

To prevent "bad" commit messages from reaching the remote server in the first place, we use [Husky](https://typicode.github.io/husky/) to run [commitlint](https://commitlint.js.org/guides/ci-setup.html) on every commit attempt. Husky is already installed locally as a dev dependency when you clone this repo.

You do not need to take any action here, but be aware of what is going on here and do not modify anything in [/.husky/](/.husky/).

If you would like to add additional commit types, you may edit [/.commitlintrc.ts](/.commitlintrc.ts), and of course remember to update the documentation here. You should however, not have to do this. Take caution.

# Documentation

## Table of Contents

0. [General Guidelines](#general-guidelines)
    1. [Commit Guidelines](#conventional-commit-guidelines)
1. [Stack](#stack)
2. [Payload CMS](#payload-cms)
3. [Styling](#styling)
    1. [Colours](#colours)
    2. [Lexical Rich Text (Payload)](#payload-cms-lexical-rich-text)
4. [Routing and Rendering](#rendering)
    1. [Static Routes](#static-routing)
    2. [Dynamic Routes](#dynamic-routes)
    3. [Static Rendering](#static-rendering-aka-ssg-in-the-pages-router)
    4. [ISR](#incremental-static-regeneration-isr)
    5. [Dynamic Rendering](#dynamic-rendering-aka-ssr-in-the-pages-router)
5. [GitHub Actions](#github-actions)
    1. [Reusable Workflows](#reusable-workflows)
    2. [On Pull / PR](#on-pull--pr)
    3. [Scheduled Workflows](#scheduled-workflows)
6. [Search Engine Optimization](#search-engine-optimization-seo)
    1. [Pages](#pages)
        1. [Clubs and Resources](#clubs--resources)
7. [Integrations](#integrations)
    1. [Mailchimp](#mailchimp)
8. [Error Handling / Common Errors](#error-handling--common-errors)
9. [Backups](#postgresql-backups-with-aws-s3)
10. [Favicon](#favicon)
11. [Archived Documentation](#archived-documentation)

## Stack

- Payload CMS
- Next.js
- Tailwind CSS
- Neon Serverless Postgres

Not all dependencies are listed above. Run `npm list` for all dependencies.

## Payload CMS

This project runs on [Payload CMS](https://payloadcms.com/docs/getting-started/what-is-payload).

### Versioning and Drafts

Unless explicitly stated below, a collection does not allow for versioning nor drafting. (Note that drafting is dependent on versioning being enabled.)

- there's nothing here cause there ain't no collections allowing versioning nor drafting

## Styling

### Colours

[Tailwind CSS](https://tailwindcss.com/docs) is used for styling. See the [config](./tailwind.config.js) for colours defined in [src/global.css](src/global.css). Attempt to always use colours defined in these files.

### Payload CMS' Lexical Rich Text

See Tailwind CSS' [Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) for a set of prose classes to style Rich Text from Payload.

## Rendering

### Static Routing

All routes are statically generated on build, by default. If a page is not mentioned below as dynamically routed, it is statically routed (caution as the below is currently a WIP).

### Dynamic Routes

Coming soon...in the meantime, see Next.js' documentation on [Dynamic Routing](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes).

### Static Rendering (aka SSG in the Pages router)

Coming soon...in the meantime, see Next.js' documentation on [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default).

### Incremental Static Regeneration (ISR)

Coming soon...in the meantime, see Next.js' documentation on [ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration).

### Dynamic Rendering (aka SSR in the Pages router)

Coming soon...in the meantime, see Next.js' documentation on [Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering).

## GitHub Actions

### Reusable Workflows

#### Vercel Production Deployment

- **Name**: Vercel Production Deployment
- **File**: [`vercel-deploy-prod.yml`](.github/workflows/vercel-deploy-prod.yml)
- **Description**: This reusable workflow is designed for deploying to the Vercel production environment.
- **Triggers**:
    - `workflow_dispatch`: Allows manual triggering from GitHub's UI.
    - `workflow_call`: Allows the workflow to be called by other workflows.
- **Jobs**:
    - **Deploy-Production**:
        - **Runs on**: `ubuntu-latest`
        - **Steps**:
            1. **Checkout Code**: Uses `actions/checkout@v4` to checkout the repository code.
            2. **Install Vercel CLI**: Installs the latest version of the Vercel CLI.
            3. **Pull Environment Information**: Pulls Vercel environment information for production.
            4. **Build Project Artifacts**: Builds the project artifacts for production.
            5. **Deploy to Vercel**: Deploys the prebuilt project artifacts to Vercel production.

#### CommitLint

- **Name**: CommitLint
- **File**: [`commitlint.yml`](.github/workflows/commitlint.yml)
- **Description**: This reusable workflow is used for commit linting to ensure commit messages adhere to the conventional commit guidelines.
- **Triggers**:
    - `workflow_call`: This workflow can be called by other workflows.
- **Jobs**:
    - **commitlint**:
        - **Name**: Lint Commits
        - **Runs on**: `ubuntu-latest`
        - **Steps**:
            1. **Checkout Code**: Uses `actions/checkout@v4` to checkout the repository code with full history to access all commits.
            2. **Set up Node.js**: Uses `actions/setup-node@v4` to set up the Node.js environment with the latest LTS version.
            3. **Print Versions**: Prints the versions of Git, Node.js, npm, and commitlint.
            4. **Install Dependencies**: Installs project dependencies using `npm ci`.
            5. **Validate Commits**: Uses `npx commitlint` to validate commit messages between the current and previous commits.

### On Pull / PR

#### Lint Commits on Non-Master Branches

- **Name**: Lint Commits on Non-Master Branches
- **File**: [`commitlint-other-branches.yml`](.github/workflows/commitlint-other-branches.yml)
- **Description**: Enforces conventional commits on non-master branches
- **Triggers**: Push or PR on any branch except master
- **Jobs**:
    - **commitlint**:
        - Uses the reusable workflow [`commitlint.yml`](.github/workflows/commitlint.yml) to validate commit messages.

#### Lint, Build, and Deploy to Vercel

- **Name**: Lint, Build, and Deploy to Vercel
- **File**: [`deploy-master.yml`](.github/workflows/deploy-master.yml)
- **Description**: This workflow automates the process of linting, building, and deploying to Vercel for the master branch.
- **Triggers**:
    - `push`: Triggered on pushes to the `master` branch (includes PR merges into `master`)
- **Jobs**:
    - **commitlint**:
        - Uses the reusable workflow [`commitlint.yml`](.github/workflows/commitlint.yml) to validate commit messages.
    - **deploy**:
        - Depends on the `commitlint` job, ensuring that commit linting must pass before deployment.
        - Uses the reusable workflow [`vercel-deploy-prod.yml`](.github/workflows/vercel-deploy-prod.yml) to deploy to Vercel production.

### Scheduled Workflows

#### Backup Payload / PostgreSQL Database

- **Name**: Backup Payload / PostgreSQL Database
- **File**: [`backup.yml`](.github/workflows/backup.yml)
- **Description**: This workflow creates nightly backups of the PostgreSQL database and stores them in AWS S3.
- **Schedule**: Backups are made nightly at 03:42 EST.
- **More information**: See [PostgreSQL Backups with AWS S3](#postgresql-backups-with-aws-s3).

## Search Engine Optimization (SEO)

### Pages

SEO titles and meta descriptions for each page are pulled from Payload's `Pages` collection.

Metadata is exported as such in each page's code:

```tsx
import { Metadata } from "next";
import { getPageFromCMS } from "@/lib/getPageFromCMS";

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPageFromCMS("page-slug-here");
    return {
        ...(page && {
            title: page.title,
            description: page.seoDescription,
        }),
    };
}
```

#### Clubs & Resources

SEO title and description are respectively pulled from the `title` and `description` fields of Payload's `Clubs` or `Resources` collection.

## Integrations

### Mailchimp

API keys are secured server-side with Next.js' server components. See [Mailchimp's stance on API key security](https://mailchimp.com/help/about-api-keys/#api+key+security). See Mailchimp's [documentation](https://mailchimp.com/developer/marketing/api/) for more.

#### To add a subscriber

Use `addListMember(email_address: string)` from [addMailchimpSubscriber.ts](src/lib/addMailchimpSubscriber.ts).

#### Removing subscribers

Please ARCHIVE subscribers. Do not permanently delete a user unless they have requested their data deleted. If a user is permanently deleted; they will not be able to resubcribe with the same email using our newsletter form.

See this [StackOverflow explanation](https://stackoverflow.com/a/52376496/) and Mailchimp's [official documentation](https://mailchimp.com/help/delete-contacts/#Archive_vs._Remove).

## Error Handling / Common Errors

### Dynamic APIs are Asynchronous

Read [Dynamic APIs are Asynchronous](https://nextjs.org/docs/messages/sync-dynamic-apis) and run

```sh
npx @next/codemod@canary next-async-request-api .
```

Then commit

```sh
git commit -m "fix: sync dynamic APIs"
```

### Type errors in src/app/(payload)/

Do not edit any files in the `(payload)` folder, with the exception of `custom.scss` and `layout.tsx`. To address any type issues, consider upgrading Payload to the latest version. **CAUTION:** Verify that the project is already on the latest version of Payload before proceeding. Upgrading without this confirmation could introduce unexpected issues, so ensure the decision to upgrade is made carefully. If upgrading is not feasible, explore alternative solutions.

To update Payload, use the following command:

```sh
npx create-payload-app@latest
```

Then commit:

```sh
git commit -m "cms: fix ts errors in (payload)"
```

Ensure you add a message if an upgrade was actually made (i.e. the version changed).

## PostgreSQL Backups with AWS S3

Originally set up with [these instructions](https://joshstrange.com/2024/04/26/nightly-postgres-backups-via-github-actions/) on Friday, January 17, 2025.

### Backups

- **Schedule**: Backups are made nightly at 03:42 EST with Github Actions. See the [workflow]().
- **Lifecycle**:
    - Current versions of objects will be [expired](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-expire-general-considerations.html) 30 days after object creation.
    - Noncurrent versions of objects will be [permanently deleted](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html) after 90 days; 10 of the newest noncurrent versions are retained.

## Favicon

All related files:

- [public/web-app-manifest-192x192.png](public/web-app-manifest-192x192.png)
- [public/web-app-manifest-512x512.png](public/web-app-manifest-512x512.png)
- [src/app/apple-icon.png](src/app/apple-icon.png)
- [src/app/favicon.ico](src/app/favicon.ico)
- [src/app/icon.svg](src/app/icon.svg)
- [src/app/manifest.json](src/app/manifest.json)

# Archived Documentation

For documentation which may no longer be relevant.

### Bulk Importing to Payload

To (re)import **club** or **resource tags**, modify the `json` files located in [scripts/bulkUpload/tagData/](scripts/bulkUpload/tagData/), then run:

```sh
payload run scripts/bulkUpload/bulkUploadTags.ts <club|resource>
```

To (re)import **clubs** or **resources**, modify the `json` files located in [scripts/bulkUpload/entityData/](scripts/bulkUpload/entityData/), then run:

```sh
payload run scripts/bulkUpload/bulkUploadClubs.ts
# or
payload run scripts/bulkUpload/bulkUploadResources.ts
```
