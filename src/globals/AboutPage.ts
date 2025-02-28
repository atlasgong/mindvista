import type { GlobalConfig } from "payload";
import { canEditContent, canEditFrenchContent, denyAccessField } from "@lib/access";
import { revalidatePath } from "next/cache";

export const AboutPage: GlobalConfig = {
  slug: "about",
  admin: {
    group: "Static Content",
    preview: () => `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
    livePreview: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
    },
  },
  versions: {
    max: 25,
    drafts: true,
  },
  hooks: {
    // Revalidate page on "save"
    afterChange: [
      () => {
        revalidatePath("/about");
      },
    ],
  },
  fields: [
    {
      name: "page",
      required: true,
      type: "relationship",
      relationTo: "pages",
      access: {
        update: denyAccessField,
      },
    },
    {
      name: "groupPhoto",
      label: "Group Photo",
      type: "upload",
      relationTo: "media",
      required: true,
      access: {
        update: canEditContent,
      },
    },
    {
      name: "title",
      label: "Page Title",
      type: "text",
      required: true,
      access: {
        update: canEditContent,
      },
    },
    {
      name: "introduction",
      label: "Introduction - En",
      type: "richText",
      required: true,
      access: {
        update: canEditContent,
      },
    },
    {
      name: "introductionFr",
      label: "Introduction - Fr",
      type: "richText",
      required: false,
      access: {
        read: canEditFrenchContent,
        update: canEditFrenchContent,
      },
    },
    {
      name: "initiativeDetails",
      label: "Initiative Details - En",
      type: "richText",
      required: true,
      access: {
        update: canEditContent,
      },
    },
    {
      name: "initiativeDetailsFr",
      label: "Initiative Details - Fr",
      type: "richText",
      required: false,
      access: {
        read: canEditFrenchContent,
        update: canEditFrenchContent,
      },
    },
    {
      name: "teams",
      label: "Team Sections",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          label: "Team Section Title",
          type: "text",
          required: true,
          access: {
            update: canEditContent,
          },
        },
        {
          name: "members",
          label: "Team Members",
          type: "array",
          required: true,
          fields: [
            {
              name: "role",
              label: "Role",
              type: "text",
              required: true,
              access: {
                update: canEditContent,
              },
            },
            {
              name: "name",
              label: "Name",
              type: "text",
              required: true,
              access: {
                update: canEditContent,
              },
            },
            {
              name: "pronouns",
              label: "Pronouns",
              type: "text",
              required: false,
              access: {
                update: canEditContent,
              },
            },
            {
              name: "image",
              label: "Profile Image",
              type: "upload",
              relationTo: "media",
              required: false,
              access: {
                update: canEditContent,
              },
            },
          ],
        },
      ],
    },
  ],
};
