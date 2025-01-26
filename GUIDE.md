# Developer Step-by-step Guide

Welcome to the MindVista website’s repository!

This guide is designed to help new developers understand, navigate, and contribute to the project without introducing errors. It assumes you are familiar with Git, TypeScript, and Next.js.

---

## 1. Read CONTRIBUTING.md

The first step when you join this project is to read the [CONTRIBUTING.md](CONTRIBUTING.md) file in the root of the repository. This document provides:

- The background and purpose of the project.
- Coding standards and naming conventions.
- The Git workflow to follow (e.g., creating branches, writing commit messages).
- The process for submitting pull requests.

---

## 2. Setup the Development Environment

To start developing locally, follow these steps:

1. Clone the repository:

    **git clone https://github.com/atlasgong/mindvista.git**

    **cd mindvista**

2. Install the dependencies (npm):

    **npm install**

3. Run the development server:

    **npm run dev**

    This will start the website locally on <http://localhost:3000> (very rarely, this may vary and be some other number like 9000).

---

## 3. Understand the Project Structure

Let’s start with the layout of the project. From top to bottom:

**.github/workflows** – Folder to correctly link the project to github and deploy everything correctly. You will most likely not need to modify this folder and its files at all.

**.husky** – Folder that runs Husky _(“commit enhancer”)_ on commit attempts. You will most likely not need to modify this folder and its files at all.

**.next** – Folder that mostly contains folders and files to properly run Next.js. Notable file that might need modifying:

**.next/static/css/app/(app)/layout.css** - This file is a Tailwind CSS-generated stylesheet responsible for setting global resets, defining utility classes (e.g., spacing, positioning, colors), and managing light/dark theme styles. It ensures consistent styling in desktop and mobile browsers and provides a comprehensive range of pre-defined classes for building responsive layouts.

**docs** – Folder for any docs you might need during development. Most likely no need to modify this folder.

**public** – **Important folder** where all the visuals (like photos of the team or in the main page) goes. If photos require updating, this is the place they have to go to.

**scripts/bulkUpload** – Payload CMS folder that is responsible for the correct configuration of bulk upload of clubs and resources data. Als o:

**scripts/bulkUpload/entityData** – Folder that contains .json files with all the data of clubs and resources.

**scripts/bulkUpload/tagData** – Folder that contains .json files with necessary tags for filtering clubs and resources.

**src** – Most likely, **the most important folder** in the whole repository that will undergo most of the changes/features.

**src/app/(app)** – Folder that contains the map of the site, the favicon, the functionality of the pages (in **(pages)**). Do not touch or modify **layout.tsx** or anything in **(payload)** folder.

**src/lib** – Folder that contains files of configurations of MailChimp and CMS.

**src/global.css** – CSS file that defines the layout of the whole website.

Other files define the configuration of Payload, change only if needed. Do not touch **src/payload-types.ts**

**package.json** – Lists the project's dependencies and scripts. Check this to understand available commands (e.g., **npm run lint, npm run build**).

**tailwind.config.js** – Defines Tailwind CSS customizations for styling.

**tsconfig.json** – Configures TypeScript for type safety and project structure.

Other files that are not in any folder are mostly needed for the proper setup of the elements. You will most likely not need to modify them at all.

---

## 4. Best Practices for Adding Features

When adding a new feature:

1. **Create a Branch**:

    **git checkout -b feature/your-feature-name**

2. **Reuse Existing Components**:
    - Before creating a new component, check **src/** for reusable logic.
3. **Document Your Changes**:
    - Add comments to explain complex logic.
    - Update relevant documentation.

Ensure your changes are modular, well-documented, and adhere to the project's structure.

---

## 5. Submit Your Work

Once your changes are ready:

1. Add and commit your changes:

    **git add .**

    **git commit -m "feat: describe your changes"**

2. Push your branch:

    **git push origin feature/your-feature-name**

3. Open a pull request on GitHub:
    - Provide a clear description of your changes.
    - Reference any related issues or tickets.

Follow the pull request guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 6. Common Pitfalls and How to Avoid Them

1. **Not Reading [CONTRIBUTING.md](CONTRIBUTING.md)**:
    - Always follow the contribution guidelines to avoid unnecessary back-and-forth and redundant code
2. **Editing Shared Logic Without Checking Dependencies**:
    - If you change files in **src/**, ensure these changes don’t break other parts of the website.
3. **Ignoring Linting and Formatting**:
    - Always run **npm run lint** and **npm run format** before committing.

---

By following this guide, you can quickly onboard and contribute effectively to the MindVista project. If you find areas in this guide that need improvement, feel free to update it!
