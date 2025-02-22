/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    pages: Page;
    legal: Legal;
    events: Event;
    clubs: Club;
    resources: Resource;
    'club-tag-categories': ClubTagCategory;
    'resource-tag-categories': ResourceTagCategory;
    'club-tags': ClubTag;
    'resource-tags': ResourceTag;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    legal: LegalSelect<false> | LegalSelect<true>;
    events: EventsSelect<false> | EventsSelect<true>;
    clubs: ClubsSelect<false> | ClubsSelect<true>;
    resources: ResourcesSelect<false> | ResourcesSelect<true>;
    'club-tag-categories': ClubTagCategoriesSelect<false> | ClubTagCategoriesSelect<true>;
    'resource-tag-categories': ResourceTagCategoriesSelect<false> | ResourceTagCategoriesSelect<true>;
    'club-tags': ClubTagsSelect<false> | ClubTagsSelect<true>;
    'resource-tags': ResourceTagsSelect<false> | ResourceTagsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    'holistic-wellness': HolisticWellness;
    sponsor: Sponsor;
  };
  globalsSelect: {
    'holistic-wellness': HolisticWellnessSelect<false> | HolisticWellnessSelect<true>;
    sponsor: SponsorSelect<false> | SponsorSelect<true>;
  };
  locale: 'en' | 'fr';
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  fullName: string;
  role: 'admin' | 'contentEditor' | 'contentEditorFr';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  altFr?: string | null;
  /**
   * Describe the purpose of this entity / where it is used.
   */
  purpose: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  slug: string;
  title: string;
  titleFr?: string | null;
  seoDescription: string;
  seoDescriptionFr?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "legal".
 */
export interface Legal {
  id: number;
  page: number | Page;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  contentFr?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: number;
  slug: string;
  title: string;
  titleFr?: string | null;
  description: string;
  descriptionFr?: string | null;
  incentive?: string | null;
  incentiveFr?: string | null;
  /**
   * Check this if you cannot guarantee every attendee will receive the incentive (e.g. limited stock).
   */
  limitedAvailability?: boolean | null;
  /**
   * Check this if the incentive is not guaranteed (e.g., chance to win a prize).
   */
  isChance?: boolean | null;
  /**
   * Add one or more date ranges for this event
   */
  dateRanges: {
    startDate: string;
    /**
     * Must be same as or later than start date
     */
    endDate: string;
    id?: string | null;
  }[];
  location: string;
  locationFr?: string | null;
  /**
   * The full URL to the location (e.g., Google Maps link). Must start with http:// or https://
   */
  locationLink?: string | null;
  /**
   * The registration/sign up URL for this event. Must start with http:// or https://
   */
  signUpLink?: string | null;
  /**
   * Link to an Instagram post.
   */
  instagramPost?: string | null;
  graphic?: (number | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "clubs".
 */
export interface Club {
  id: number;
  slug: string;
  title: string;
  titleFr?: string | null;
  description: string;
  descriptionFr?: string | null;
  website?: string | null;
  /**
   * Does this club have a sign-up link for their newsletter?
   */
  newsletter?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  otherSocials?:
    | {
        link: string;
        id?: string | null;
      }[]
    | null;
  currentlyActive?: boolean | null;
  tags?: (number | ClubTag)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "club-tags".
 */
export interface ClubTag {
  id: number;
  name: string;
  category: number | ClubTagCategory;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "club-tag-categories".
 */
export interface ClubTagCategory {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resources".
 */
export interface Resource {
  id: number;
  slug: string;
  title: string;
  titleFr?: string | null;
  description: string;
  descriptionFr?: string | null;
  website?: string | null;
  /**
   * Does this resource have a sign-up link for their newsletter?
   */
  newsletter?: string | null;
  insuranceDetails?: string | null;
  insuranceDetailFr?: string | null;
  insuranceProviders?:
    | {
        insuranceProvider: {
          name: string;
          nameFr?: string | null;
          description?: string | null;
          descriptionFr?: string | null;
          id?: string | null;
        }[];
        id?: string | null;
      }[]
    | null;
  email?: string | null;
  phoneNumber?: string | null;
  location?: string | null;
  locationFr?: string | null;
  channelOnline?: boolean | null;
  channelTelephone?: boolean | null;
  channelInPerson?: boolean | null;
  onCampus?: boolean | null;
  currentlyActive?: boolean | null;
  tags?: (number | ResourceTag)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resource-tags".
 */
export interface ResourceTag {
  id: number;
  name: string;
  category: number | ResourceTagCategory;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resource-tag-categories".
 */
export interface ResourceTagCategory {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'legal';
        value: number | Legal;
      } | null)
    | ({
        relationTo: 'events';
        value: number | Event;
      } | null)
    | ({
        relationTo: 'clubs';
        value: number | Club;
      } | null)
    | ({
        relationTo: 'resources';
        value: number | Resource;
      } | null)
    | ({
        relationTo: 'club-tag-categories';
        value: number | ClubTagCategory;
      } | null)
    | ({
        relationTo: 'resource-tag-categories';
        value: number | ResourceTagCategory;
      } | null)
    | ({
        relationTo: 'club-tags';
        value: number | ClubTag;
      } | null)
    | ({
        relationTo: 'resource-tags';
        value: number | ResourceTag;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  fullName?: T;
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  altFr?: T;
  purpose?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  titleFr?: T;
  seoDescription?: T;
  seoDescriptionFr?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "legal_select".
 */
export interface LegalSelect<T extends boolean = true> {
  page?: T;
  content?: T;
  contentFr?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events_select".
 */
export interface EventsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  titleFr?: T;
  description?: T;
  descriptionFr?: T;
  incentive?: T;
  incentiveFr?: T;
  limitedAvailability?: T;
  isChance?: T;
  dateRanges?:
    | T
    | {
        startDate?: T;
        endDate?: T;
        id?: T;
      };
  location?: T;
  locationFr?: T;
  locationLink?: T;
  signUpLink?: T;
  instagramPost?: T;
  graphic?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "clubs_select".
 */
export interface ClubsSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  titleFr?: T;
  description?: T;
  descriptionFr?: T;
  website?: T;
  newsletter?: T;
  email?: T;
  phoneNumber?: T;
  facebook?: T;
  instagram?: T;
  otherSocials?:
    | T
    | {
        link?: T;
        id?: T;
      };
  currentlyActive?: T;
  tags?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resources_select".
 */
export interface ResourcesSelect<T extends boolean = true> {
  slug?: T;
  title?: T;
  titleFr?: T;
  description?: T;
  descriptionFr?: T;
  website?: T;
  newsletter?: T;
  insuranceDetails?: T;
  insuranceDetailFr?: T;
  insuranceProviders?:
    | T
    | {
        insuranceProvider?:
          | T
          | {
              name?: T;
              nameFr?: T;
              description?: T;
              descriptionFr?: T;
              id?: T;
            };
        id?: T;
      };
  email?: T;
  phoneNumber?: T;
  location?: T;
  locationFr?: T;
  channelOnline?: T;
  channelTelephone?: T;
  channelInPerson?: T;
  onCampus?: T;
  currentlyActive?: T;
  tags?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "club-tag-categories_select".
 */
export interface ClubTagCategoriesSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resource-tag-categories_select".
 */
export interface ResourceTagCategoriesSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "club-tags_select".
 */
export interface ClubTagsSelect<T extends boolean = true> {
  name?: T;
  category?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "resource-tags_select".
 */
export interface ResourceTagsSelect<T extends boolean = true> {
  name?: T;
  category?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "holistic-wellness".
 */
export interface HolisticWellness {
  id: number;
  page: number | Page;
  heroContent: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  heroContentFr?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  wellnessWheelTopContent: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  wellnessWheelTopContentFr?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  wellnessWheelDimensions: {
    name: string;
    nameFr?: string | null;
    description: string;
    descriptionFr?: string | null;
    /**
     * See https://v3.tailwindcss.com/docs/customizing-colors for a list of colors.
     */
    color: string;
    id?: string | null;
  }[];
  wellnessWheelBottomContent: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  wellnessWheelBottomContentFr?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  sections?:
    | {
        content: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        contentFr?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sponsor".
 */
export interface Sponsor {
  id: number;
  page: number | Page;
  ourSponsorsSection: string;
  ourSponsorsSectionFr?: string | null;
  callout: string;
  calloutFr?: string | null;
  sponsorUsSection: string;
  sponsorUsSectionFr?: string | null;
  sponsors: {
    url?: string | null;
    logo: number | Media;
    id?: string | null;
  }[];
  _status?: ('draft' | 'published') | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "holistic-wellness_select".
 */
export interface HolisticWellnessSelect<T extends boolean = true> {
  page?: T;
  heroContent?: T;
  heroContentFr?: T;
  wellnessWheelTopContent?: T;
  wellnessWheelTopContentFr?: T;
  wellnessWheelDimensions?:
    | T
    | {
        name?: T;
        nameFr?: T;
        description?: T;
        descriptionFr?: T;
        color?: T;
        id?: T;
      };
  wellnessWheelBottomContent?: T;
  wellnessWheelBottomContentFr?: T;
  sections?:
    | T
    | {
        content?: T;
        contentFr?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sponsor_select".
 */
export interface SponsorSelect<T extends boolean = true> {
  page?: T;
  ourSponsorsSection?: T;
  ourSponsorsSectionFr?: T;
  callout?: T;
  calloutFr?: T;
  sponsorUsSection?: T;
  sponsorUsSectionFr?: T;
  sponsors?:
    | T
    | {
        url?: T;
        logo?: T;
        id?: T;
      };
  _status?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}