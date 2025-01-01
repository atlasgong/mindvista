### A Note to Contributors

Please make an effort to follow these guidelines and conventions to help us keep our code and commit history clear and organized. If you have ideas for further improvements, or better conventions, we'd like to hear them :)

Thank you and happy coding!

— Atlas ❤️

# General Guidelines

[Skip to documentation.](#documentation)

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
| `merge`    | Represents any `git merge`.                                                              | `merge: branch 'master' into about-page`                      |
| `content`  | Adding, updating, or removing website content (text, images, etc.).                      | `content: update About Us page`                               |
| `feat`     | A new feature or functionality added to the website.                                     | `feat: add search bar to the navigation`                      |
| `fix`      | A bug fix, including broken links, layout issues, or code bugs.                          | `fix: resolve mobile menu not opening on small screens`       |
| `resp`     | Changes to improve responsive design.                                                    | `resp: decrease side margins for smaller devices`             |
| `a11y`     | Accessibility improvements to enhance website usability.                                 | `a11y: add alt text to all homepage images`                   |
| `ui`       | Visual changes to the site’s appearance (e.g., colors, fonts, spacing adjustments).      | `ui: change button color to match theme`                      |
| `perf`     | Changes made to improve website performance (e.g., optimizing images or code).           | `perf: lazy-load images on about us page`                     |
| `refactor` | Code restructuring or cleaning that doesn’t change any functionality.                    | `refactor: reorganize header component files`                 |
| `seo`      | Changes to improve search engine optimization.                                           | `seo: update meta descriptions for mental wellness page`      |
| `legal`    | Updates to legal documents, like privacy policies or terms of service.                   | `legal: update privacy policy to include new data use clause` |
| `docs`     | Documentation changes, such as README updates, guidelines, or other informational files. | `docs: add commit guidelines for contributors`                |
| `other`    | If you must...                                                                           | `other: go on a relaxing stroll in outremont`                 |

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

<!-- ### Husky

These commit guidelines are remotely enforced and deployment will be blocked if conventions are not adhered to.

To prevent "bad" commit messages from reaching the remote server in the first place, we use [Husky](https://typicode.github.io/husky/) to run [commitlint](https://commitlint.js.org/guides/ci-setup.html) on every commit attempt. Husky is already installed locally as a dev dependency when you clone this repo.

You do not need to take any action here, but be aware of what is going on here and do not modify anything in [/.husky/](/.husky/).

If you would like to add additional commit types, you may edit [/.commitlintrc.ts](/.commitlintrc.ts), and of course remember to update the documentation here. You should however, not have to do this. Take caution. -->

# Documentation

## Stack

- Payload CMS
- Next.js
- Tailwind CSS
- Neon Serverless Postgres

Not all dependencies are listed above. Run `npm list` for all dependencies.

## Styling

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/docs) is used for styling.

## Pages