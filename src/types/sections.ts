import { SectionType } from "@/lib/contentful";

// Base types used across multiple sections
export interface AssetFields {
    title: string;
    description?: string;
    file: {
      url: string;
      contentType: string;
      details?: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
    };
}

export interface NavigationLink {
  text: string;
  url: string;
  isExternal?: boolean;
  children?: NavigationLink[];
}

export interface SectionFields {
  type: SectionType;
  content: ContentfulEntry<any>;
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
}

// Common types
export type ButtonFields = {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: ContentfulEntry<AssetFields>;
};

// Hero Section
export type HeroSectionFields = {
  title: string;
  subtitle?: string;
  backgroundMedia?: ContentfulEntry<AssetFields>;
  ctaButton?: ContentfulEntry<ButtonFields>;
  alignment?: 'center' | 'left' | 'right';
  backgroundColor?: string;
  overlayOpacity?: number;
};

// Features Section
export interface FeatureItemFields {
  title: string;
  description: string;
  icon?: ContentfulEntry<AssetFields>;
  link?: string;
}

export interface FeaturesSectionFields {
  title: string;
  subtitle?: string;
  features: ContentfulEntry<FeatureItemFields>[];
  layout?: 'grid' | 'list' | 'cards';
  columns?: 1 | 2 | 3 | 4;
  backgroundColor?: string;
}

// Testimonial Types
export interface TestimonialFields {
    quote: string;
    authorName: string;
    authorTitle?: string;
    rating?: number;
    company?: string;
    authorImage?: ContentfulEntry<AssetFields>;
}

export interface TestimonialsSectionFields {
  title?: string;
  subtitle?: string;
  testimonials: ContentfulEntry<TestimonialFields>[];
  layout?: 'grid' | 'carousel' | 'list';
  backgroundColor?: string;
}

// Product Specs Section
export interface ProductSpecFields {
  name: string;
  value: string;
  icon?: ContentfulEntry<AssetFields>;
  description?: string;
  unit?: string;
}

export interface ProductSpecsSectionFields {
  title: string;
  subtitle?: string;
  specs: ContentfulEntry<ProductSpecFields>[];
  layout?: 'table' | 'grid' | 'list';
  backgroundColor?: string;
}

export interface CTABlockFields {
  title: string;
  subtitle?: string;
  primaryButton?: ContentfulEntry<ButtonFields>;
  secondaryButton?: ContentfulEntry<ButtonFields>;
  backgroundImage?: ContentfulEntry<AssetFields>;
  alignment?: 'center' | 'left' | 'right';
}

export interface CTASectionFields {
  title: string;
  subtitle?: string;
  ctaBlock?: ContentfulEntry<CTABlockFields>[];
  backgroundImage?: ContentfulEntry<AssetFields>;
  backgroundColor?: string;
  overlayOpacity?: number;
}

// Footer Section
export interface SocialLinkFields {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube';
  url: string;
  icon?: ContentfulEntry<AssetFields>;
}

export interface FooterColumnFields {
  heading?: string;
  links?: ContentfulEntry<NavigationLink>[];
  content?: string;
}

export interface FooterSectionFields {
  title: string;
  logo?: ContentfulEntry<AssetFields>;
  tagline?: string;
  columns?: ContentfulEntry<FooterColumnFields>[];
  socialLinks?: ContentfulEntry<SocialLinkFields>[];
  bottomLinks?: ContentfulEntry<NavigationLink>[];
  copyrightText?: string;
  layout?: 'standard' | 'minimal' | 'expanded';
  backgroundColor?: string;
  accentColor?: string;
  showDivider?: boolean;
}

// Contentful Entry Types
export interface ContentfulEntry<T> {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: T;
}

// Section Entry Types
export type HeroSectionEntry = ContentfulEntry<HeroSectionFields>;
export type FeaturesSectionEntry = ContentfulEntry<FeaturesSectionFields>;
export type TestimonialsSectionEntry = ContentfulEntry<TestimonialsSectionFields>;
export type ProductSpecsSectionEntry = ContentfulEntry<ProductSpecsSectionFields>;
export type CTASectionEntry = ContentfulEntry<CTASectionFields>;
export type FooterSectionEntry = ContentfulEntry<FooterSectionFields>;

// Union type for all section entries
export type SectionEntry =
  | HeroSectionEntry
  | FeaturesSectionEntry
  | TestimonialsSectionEntry
  | ProductSpecsSectionEntry
  | CTASectionEntry
  | FooterSectionEntry;