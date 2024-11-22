### A Note to Contributors

Please make an effort to follow these guidelines and conventions to help us keep our code and commit history clear and organized. If you have ideas for further improvements, or better conventions, we'd like to hear them :)

Thank you and happy coding!

— Atlas ❤️

## General Guidelines
Please write clear and concise code. It is recommended to use a formatter (e.g. Prettier). Ensure that files are well-commented. 

### Responsiveness
REM is 16px. Do not use any absolute length units. If you do anyways, justification must be provided.

### Accessibility
We make an attempt to follow [WCAG 2.1 AA standards](https://www.w3.org/TR/WCAG21/).

## Conventional Commit Guidelines

This repository follows a modified conventional commit style to keep our commit history clear and structured. Here are the commit types to use:

### Commit Types

| Type | Description | Example |
| ---------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `build` | Changes that affect the build system or dependencies. | `build: update to latest mindfulness package` |
| `ci` | Changes to continuous integration setup, like configuration files. | `ci: add deployment workflow for GitHub Actions` |
| `content` | Adding, updating, or removing website content (text, images, etc.). | `content: update About Us page` |
| `feat` | A new feature or functionality added to the website. | `feat: add search bar to the navigation` |
| `fix` | A bug fix, including broken links, layout issues, or code bugs. | `fix: resolve mobile menu not opening on small screens` |
| `a11y` | Accessibility improvements to enhance website usability. | `a11y: add alt text to all homepage images` |
| `ui` | Visual changes to the site’s appearance (e.g., colors, fonts, spacing adjustments). | `ui: change button color to match theme` |
| `perf` | Changes made to improve website performance (e.g., optimizing images or code). | `perf: lazy-load images on about us page` |
| `refactor` | Code restructuring or cleaning that doesn’t change any functionality. | `refactor: reorganize header component files` |
| `seo` | Changes to improve search engine optimization. | `seo: update meta descriptions for mental wellness page`             |
| `legal` | Updates to legal documents, like privacy policies or terms of service. | `legal: update privacy policy to include new data use clause` |
| `docs` | Documentation changes, such as README updates, guidelines, or other informational files. | `docs: add commit guidelines for contributors` |
| `other` | If you must... | `other: go on a relaxing stroll in outremont` |

### Example Usage

-   **Adding a New Page**: `feat: add a contact page with form`
-   **Changing Colors on Buttons for Consistency**: `ui: update primary button color across site`
-   **Fixing Broken Link**: `fix: correct link in footer to redirect to new policy page`
-   **Improving Page Load Speed**: `perf: compress splash images to improve load time`
-   **Making Images More Accessible**: `a11y: add captions to staff photos`
-   **Updating Privacy Policy**: `legal: update privacy policy to reflect data protection laws`

### General Rules

-   **Atomic Commits**: Each commit should represent a single, specific change, to the best of your ability.
-   **Message Clarity**: Ensure commit messages clearly state what the change is.
-   **Message Length**: Try to limit commit messages to under 50 characters if possible, but do not sacrifice clarity to meet said limit. (some of the examples above use more than 50 characters!)
-   **Descriptions**: Descriptions are...a free for all...for right now. Ensure clarity and concision nevertheless.
-   **Scope**: Use lowercase, concise scopes if you want to specify a particular section (e.g., `feat(nav): add dropdown menu`).

---