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

export type SectionFields = {
  order?: number;
  title?: string;
  subtitle?: string;
  [key: string]: any;
};

export type Section = {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: SectionFields;
};

export type SectionType = 
  | 'heroSection'
  | 'featuresSection'
  | 'testimonialsSection'
  | 'productSpecsSection'
  | 'ctaSection'
  | 'footerSection';

const CONTENT_TYPES: SectionType[] = [
  'heroSection',
  'featuresSection',
  'testimonialsSection',
  'productSpecsSection',
  'ctaSection',
  'footerSection',
];

export async function getLandingPageSections() {
  try {
    // Fetch each content type separately
    const responses = await Promise.all(
      CONTENT_TYPES.map(contentType => 
        contentfulClient.getEntries({ content_type: contentType })
          .catch(error => {
            console.warn(`Error fetching ${contentType}:`, error);
            return { items: [] };
          })
      )
    );

    // Combine all items
    const allItems = responses.flatMap(response => response.items);

    // Sort sections based on their content type to ensure a consistent order
    const sectionOrder: Record<SectionType, number> = {
      heroSection: 1,
      featuresSection: 2,
      testimonialsSection: 3,
      productSpecsSection: 4,
      ctaSection: 5,
      footerSection: 6,
    };

    return allItems.sort((a, b) => {
      const contentTypeA = a.sys.contentType.sys.id as SectionType;
      const contentTypeB = b.sys.contentType.sys.id as SectionType;
      const aOrder = sectionOrder[contentTypeA] ?? 999;
      const bOrder = sectionOrder[contentTypeB] ?? 999;
      return aOrder - bOrder;
    }) as Section[];
  } catch (error) {
    console.error('Error fetching landing page sections:', error);
    // Return an empty array if there's an error
    return [];
  }
} 