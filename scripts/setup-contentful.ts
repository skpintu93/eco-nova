import pkg from 'contentful-management';
import type { ContentFields } from 'contentful-management/dist/typings/contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_SPACE_ID) {
  throw new Error('Missing required environment variables');
}

const client = createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

const buttonFields: ContentFields[] = [
  {
    id: 'text',
    name: 'Button Text',
    type: 'Symbol',
    required: true,
    localized: false,
    validations: [{ size: { max: 50 } }]
  },
  {
    id: 'link',
    name: 'Button Link',
    type: 'Symbol',
    required: true,
    localized: false,
    validations: [{ regexp: { pattern: '^https?://', flags: 'i' } }]
  },
  {
    id: 'variant',
    name: 'Button Variant',
    type: 'Symbol',
    required: true,
    localized: false,
    validations: [{ in: ['primary', 'secondary', 'outline'] }],
    defaultValue: { 'en-US': 'primary' }
  }
];

const ctaBlockFields: ContentFields[] = [
  {
    id: 'title',
    name: 'Title',
    type: 'Symbol',
    required: true,
    localized: false,
    validations: [{ size: { max: 100 } }]
  },
  {
    id: 'description',
    name: 'Description',
    type: 'Text',
    required: true,
    localized: false,
    validations: [{ size: { max: 500 } }]
  },
  {
    id: 'primaryButton',
    name: 'Primary Button',
    type: 'Link',
    required: false,
    localized: false,
    validations: [{ linkContentType: ['button'] }],
    linkType: 'Entry'
  },
  {
    id: 'backgroundImage',
    name: 'Background Image',
    type: 'Link',
    required: false,
    localized: false,
    validations: [{ linkContentType: ['asset'] }],
    linkType: 'Asset'
  }
];

interface ContentTypeDefinition {
  name: string;
  id: string;
  displayField: string;
  fields: ContentFields<Record<string, any>>[];
}

const contentTypes: ContentTypeDefinition[] = [
  {
    name: 'Button',
    id: 'button',
    displayField: 'text',
    fields: buttonFields
  },
  {
    name: 'CTA Block',
    id: 'ctaBlock',
    displayField: 'title',
    fields: ctaBlockFields
  },
  {
    name: 'Testimonial',
    id: 'testimonial',
    displayField: 'authorName',
    fields: [
      {
        id: 'quote',
        name: 'Quote',
        type: 'Text',
        required: true,
        localized: false,
      },
      {
        id: 'authorName',
        name: 'Author Name',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'authorTitle',
        name: 'Author Title',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'authorImage',
        name: 'Author Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'rating',
        name: 'Rating',
        type: 'Integer',
        required: false,
        localized: false,
        validations: [
          {
            range: {
              min: 1,
              max: 5,
            },
          },
        ],
      },
      {
        id: 'company',
        name: 'Company',
        type: 'Symbol',
        required: false,
        localized: false,
      },
    ],
  },
  {
    name: 'Testimonials Section',
    id: 'testimonialsSection',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'subtitle',
        name: 'Subtitle',
        type: 'Text',
        required: false,
        localized: false,
      },
      {
        id: 'testimonials',
        name: 'Testimonials',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            {
              linkContentType: ['testimonial'],
            },
          ],
        },
      },
      {
        id: 'layout',
        name: 'Layout',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            in: ['grid', 'carousel', 'list'],
          },
        ],
      },
      {
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        required: false,
        localized: false,
      },
    ],
  },
  {
    name: 'Product Spec',
    id: 'productSpec',
    displayField: 'name',
    fields: [
      {
        id: 'name',
        name: 'Name',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'value',
        name: 'Value',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'unit',
        name: 'Unit',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'icon',
        name: 'Icon',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Text',
        required: false,
        localized: false,
      },
    ],
  },
  {
    name: 'Product Specs Section',
    id: 'productSpecsSection',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'subtitle',
        name: 'Subtitle',
        type: 'Text',
        required: false,
        localized: false,
      },
      {
        id: 'specs',
        name: 'Specs',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            {
              linkContentType: ['productSpec'],
            },
          ],
        },
      },
      {
        id: 'layout',
        name: 'Layout',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            in: ['table', 'grid', 'list'],
          },
        ],
      },
      {
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        required: false,
        localized: false,
      },
    ],
  },
  {
    name: 'CTA Section',
    id: 'ctaSection',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'subtitle',
        name: 'Subtitle',
        type: 'Text',
        required: false,
        localized: false,
      },
      {
        id: 'ctaBlock',
        name: 'CTA Block',
        type: 'Link',
        linkType: 'Entry',
        required: true,
        localized: false,
        validations: [
          {
            linkContentType: ['ctaBlock'],
          },
        ],
      },
      {
        id: 'backgroundImage',
        name: 'Background Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'overlayOpacity',
        name: 'Overlay Opacity',
        type: 'Number',
        required: false,
        localized: false,
        validations: [
          {
            range: {
              min: 0,
              max: 1,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Section',
    id: 'section',
    displayField: 'type',
    fields: [
      {
        id: 'type',
        name: 'Type',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            in: ['hero', 'features', 'testimonials', 'productSpecs', 'cta'],
          },
        ],
      },
      {
        id: 'content',
        name: 'Content',
        type: 'Link',
        linkType: 'Entry',
        required: true,
        localized: false,
        validations: [
          {
            linkContentType: ['heroSection', 'featuresSection', 'testimonialsSection', 'productSpecsSection', 'ctaSection'],
          },
        ],
      },
      {
        id: 'padding',
        name: 'Padding',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            in: ['none', 'small', 'medium', 'large'],
          },
        ],
      },
      {
        id: 'margin',
        name: 'Margin',
        type: 'Symbol',
        required: false,
        localized: false,
        validations: [
          {
            in: ['none', 'small', 'medium', 'large'],
          },
        ],
      },
      {
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        required: false,
        localized: false,
      },
      {
        id: 'isFullWidth',
        name: 'Is Full Width',
        type: 'Boolean',
        required: false,
        localized: false,
      },
    ],
  },
  {
    name: 'Landing Page',
    id: 'landingPage',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true,
        localized: false,
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            unique: true,
          },
        ],
      },
      {
        id: 'metaDescription',
        name: 'Meta Description',
        type: 'Text',
        required: false,
        localized: false,
      },
      {
        id: 'metaImage',
        name: 'Meta Image',
        type: 'Link',
        linkType: 'Asset',
        required: false,
        localized: false,
        validations: [
          {
            linkMimetypeGroup: ['image'],
          },
        ],
      },
      {
        id: 'sections',
        name: 'Sections',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Link',
          linkType: 'Entry',
          validations: [
            {
              linkContentType: ['section'],
            },
          ],
        },
      },
      {
        id: 'status',
        name: 'Status',
        type: 'Symbol',
        required: true,
        localized: false,
        validations: [
          {
            in: ['draft', 'published'],
          },
        ],
      },
    ],
  },
];

async function checkAndUpdateContentTypes() {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Check if content types exist
    const existingContentTypes = await environment.getContentTypes();
    const existingTypeIds = existingContentTypes.items.map(ct => ct.sys.id);

    // Create or update CTA Block content type
    if (!existingTypeIds.includes('ctaBlock')) {
      console.log('Creating CTA Block content type...');
      await environment.createContentType({
        name: 'CTA Block',
        displayField: 'title',
        fields: ctaBlockFields
      });
      console.log('CTA Block content type created');
    } else {
      console.log('Updating CTA Block content type...');
      const ctaBlockType = await environment.getContentType('ctaBlock');
      ctaBlockType.fields = ctaBlockFields;
      await ctaBlockType.update();
      console.log('CTA Block content type updated');
    }

    // Create or update Button content type
    if (!existingTypeIds.includes('button')) {
      console.log('Creating Button content type...');
      await environment.createContentType({
        name: 'Button',
        displayField: 'text',
        fields: buttonFields
      });
      console.log('Button content type created');
    } else {
      console.log('Updating Button content type...');
      const buttonType = await environment.getContentType('button');
      buttonType.fields = buttonFields;
      await buttonType.update();
      console.log('Button content type updated');
    }

    // Publish content types
    const ctaBlockType = await environment.getContentType('ctaBlock');
    await ctaBlockType.publish();
    const buttonType = await environment.getContentType('button');
    await buttonType.publish();
    console.log('Content types published');

  } catch (error) {
    console.error('Error checking/updating content types:', error);
    throw error;
  }
}

// Example entries to create
const buttonEntry = {
  fields: {
    text: {
      'en-US': 'Get Started'
    },
    link: {
      'en-US': 'https://eco-nova.com/signup'
    },
    variant: {
      'en-US': 'primary'
    }
  }
};

const ctaBlockEntry = {
  fields: {
    title: {
      'en-US': 'Join Our Sustainable Community'
    },
    description: {
      'en-US': 'Be part of the change. Together, we can create a more sustainable future for generations to come.'
    },
    primaryButton: {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: 'primaryButton' // This will be updated after button creation
        }
      }
    },
    backgroundImage: {
      'en-US': {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: 'ctaBackground'
        }
      }
    }
  }
};

async function createEntries() {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Create button first
    const button = await environment.createEntry('button', buttonEntry);
    await button.publish();
    console.log('Created and published entry of type: button');

    // Update CTA block with button reference
    const ctaBlockWithButton = {
      ...ctaBlockEntry,
      fields: {
        ...ctaBlockEntry.fields,
        primaryButton: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: button.sys.id
            }
          }
        }
      }
    };

    const ctaBlock = await environment.createEntry('ctaBlock', ctaBlockWithButton);
    await ctaBlock.publish();
    console.log('Created and published entry of type: ctaBlock');

  } catch (error) {
    console.error('Error creating entries:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting setup...');
    await checkAndUpdateContentTypes();
    console.log('Creating entries...');
    await createEntries();
    console.log('Setup completed successfully!');
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

main(); 