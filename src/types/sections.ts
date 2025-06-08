// Base types used across multiple sections
export interface Asset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Link {
  text: string;
  url: string;
}

export interface BaseSectionFields {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  order?: number;
}

// Hero Section
export interface HeroSectionFields extends BaseSectionFields {
  headline: string;
  subheadline: string;
  ctaPrimary?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  ctaSecondary?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  backgroundImage?: Asset;
  layout?: 'centered' | 'split' | 'minimal';
}

// Features Section
export interface Feature {
  title: string;
  description: string;
  icon?: Asset;
}

export interface FeaturesSectionFields extends BaseSectionFields {
  features: Feature[];
  layout?: 'grid' | 'list' | 'cards';
  columns?: 1 | 2 | 3 | 4;
  showIcons?: boolean;
}

// Testimonials Section
export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorImage?: Asset;
  rating?: 1 | 2 | 3 | 4 | 5;
  company?: string;
}

export interface TestimonialsSectionFields extends BaseSectionFields {
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel' | 'list';
  columns?: 1 | 2 | 3;
  showRatings?: boolean;
  showCompany?: boolean;
}

// Product Specs Section
export interface Spec {
  name: string;
  value: string;
  icon?: Asset;
  description?: string;
  unit?: string;
  highlight?: boolean;
}

export interface ProductSpecsSectionFields extends BaseSectionFields {
  specs: Spec[];
  layout?: 'table' | 'grid' | 'list';
  columns?: 1 | 2 | 3 | 4;
  showIcons?: boolean;
  showUnits?: boolean;
  highlightImportant?: boolean;
}

// CTA Section
export interface Button {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: Asset;
}

export interface CTASectionFields extends BaseSectionFields {
  headline: string;
  description?: string;
  buttons?: Button[];
  backgroundImage?: Asset;
  layout?: 'centered' | 'split' | 'minimal';
  overlayOpacity?: number;
  buttonAlignment?: 'left' | 'center' | 'right';
}

// Footer Section
export interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube';
  url: string;
  label?: string;
  icon?: Asset;
}

export interface FooterColumn {
  heading?: string;
  links?: Link[];
  content?: string;
}

export interface NewsletterConfig {
  headline: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
  disclaimer?: string;
  onSubscribe?: (email: string) => void;
}

export interface FooterSectionFields extends BaseSectionFields {
  logo?: Asset;
  tagline?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  bottomLinks?: Link[];
  newsletter?: NewsletterConfig;
  copyrightText?: string;
  layout?: 'standard' | 'minimal' | 'expanded';
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

// Component Props Types
export interface SectionProps<T extends BaseSectionFields> {
  fields: T;
  className?: string;
}

export interface HeroSectionProps extends SectionProps<HeroSectionFields> {}
export interface FeaturesSectionProps extends SectionProps<FeaturesSectionFields> {}
export interface TestimonialsSectionProps extends SectionProps<TestimonialsSectionFields> {}
export interface ProductSpecsSectionProps extends SectionProps<ProductSpecsSectionFields> {}
export interface CTASectionProps extends SectionProps<CTASectionFields> {}
export interface FooterSectionProps extends SectionProps<FooterSectionFields> {} 