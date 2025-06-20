import { AssetFields, ContentfulEntry, SectionFields } from '@/types/sections';
import { createClient } from 'contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not defined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export type SectionType = 
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'productSpecs'
  | 'cta'
  | 'footer';

export type LandingPageMetadata = {
  title: string;
  slug: string;
  metaDescription: string;
  metaImage?: ContentfulEntry<AssetFields>;
  status: 'published' | 'draft';
};

export async function getEntryById<T>(id: string, locale: 'en-US' | 'es'): Promise<ContentfulEntry<T>> {
  return await contentfulClient.getEntry(id, {
    include: 10,
    locale: locale
  }) as unknown as ContentfulEntry<T>;
}

export async function getLandingPageSections(slug: string, locale: 'en-US' | 'es'): Promise<ContentfulEntry<SectionFields>[]> {
  try {
    console.log('locale', locale);
    // Fetch landing page content type with only its sections (level 2 deep)
    const response = await contentfulClient.getEntries({
      content_type: 'landingPage',
      'fields.slug': slug,
      select: ['fields.sections'],
      include: 2, // This will fetch landing page and its direct sections
      limit: 1, // Assuming we only have one landing page
      locale: locale
    });

    if (!response.items.length) {
      console.warn('No landing page found');
      return [];
    }

   return response.items[0].fields.sections as unknown as ContentfulEntry<SectionFields>[];

  } catch (error) {
    console.error('Error fetching landing page:', error);
    return [];
  }
}

export async function getLandingPageMetadata(locale: 'en-US' | 'es'): Promise<LandingPageMetadata | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'landingPage',
      limit: 1,
      select: ['fields.title', 'fields.slug', 'fields.metaDescription', 'fields.metaImage', 'fields.status'],
      locale: locale
    });

    if (!response.items.length) {
      console.warn('No landing page found');
      return null;
    }

    const landingPage = response.items[0].fields as unknown as LandingPageMetadata;
    if (!landingPage.title || !landingPage.slug || !landingPage.metaDescription) {
      console.warn('Landing page missing required metadata fields');
      return null;
    }

    return {
      title: landingPage.title,
      slug: landingPage.slug,
      metaDescription: landingPage.metaDescription,
      metaImage: landingPage.metaImage,
      status: landingPage.status
    };
  } catch (error) {
    console.error('Error fetching landing page metadata:', error);
    return null;
  }
}