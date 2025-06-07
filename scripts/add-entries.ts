import pkg from 'contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_SPACE_ID) {
  throw new Error('Missing required environment variables');
}

// Initialize the Contentful Management client
const client = createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN
});

interface ButtonData {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
}

interface CtaBlockData {
  title: string;
  subtitle: string;
  primaryButton: ButtonData;
  secondaryButton?: ButtonData;
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: {
    sys: {
      type: 'Link';
      linkType: 'Asset';
      id: string;
    };
  };
}

interface EntriesData {
  ctaBlock: CtaBlockData[];
  button: ButtonData[];
}

// Example entries data
const entriesData: EntriesData = {
  ctaBlock: [
    {
      title: 'Join Our Sustainable Community',
      subtitle: 'Be part of the change. Together, we can create a more sustainable future for generations to come.',
      primaryButton: {
        text: 'Get Started',
        link: 'https://eco-nova.com/signup',
        variant: 'primary'
      },
      secondaryButton: {
        text: 'Learn More',
        link: 'https://eco-nova.com/about',
        variant: 'secondary'
      },
      alignment: 'center'
    },
    {
      title: 'Transform Your Business',
      subtitle: 'Discover how sustainable practices can drive growth and innovation in your organization.',
      primaryButton: {
        text: 'Contact Sales',
        link: 'https://eco-nova.com/contact',
        variant: 'primary'
      },
      alignment: 'left'
    }
  ],
  button: [
    {
      text: 'Get Started',
      link: 'https://eco-nova.com/signup',
      variant: 'primary'
    },
    {
      text: 'Learn More',
      link: 'https://eco-nova.com/about',
      variant: 'secondary'
    },
    {
      text: 'Contact Sales',
      link: 'https://eco-nova.com/contact',
      variant: 'outline'
    }
  ]
};

async function readContentTypes() {
  try {
    const contentTypesPath = path.join(__dirname, '..', 'contentful', 'content-types.json');
    const contentTypesJson = await fs.readFile(contentTypesPath, 'utf-8');
    return JSON.parse(contentTypesJson);
  } catch (error) {
    console.error('Error reading content types:', error);
    throw error;
  }
}

async function createEntry(environment: any, contentTypeId: string, fields: ButtonData | CtaBlockData) {
  try {
    // Transform fields to Contentful format
    const contentfulFields = Object.entries(fields).reduce((acc, [key, value]) => {
      // Handle nested objects (like primaryButton)
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if ('text' in value && 'link' in value && 'variant' in value) {
          // This is a button object
          const buttonData = value as ButtonData;
          return {
            ...acc,
            [key]: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: buttonData.text.toLowerCase().replace(/\s+/g, '-') // Use text as ID
                }
              }
            }
          };
        }
      }
      
      // Handle regular fields
      return {
        ...acc,
        [key]: {
          'en-US': value
        }
      };
    }, {});

    const entry = await environment.createEntry(contentTypeId, {
      fields: contentfulFields
    });

    // Don't publish the entry, keep it in draft status
    console.log(`Created entry of type ${contentTypeId} (draft):`, fields);
    return entry;
  } catch (error) {
    console.error(`Error creating entry of type ${contentTypeId}:`, error);
    throw error;
  }
}

async function addEntries() {
  try {
    console.log('Reading content types...');
    const contentTypes = await readContentTypes();
    
    console.log('Connecting to Contentful...');
    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    // Create entries in the correct order (buttons first, then CTA blocks)
    const createdEntries = new Map();

    // Create button entries first
    for (const buttonData of entriesData.button) {
      const entry = await createEntry(environment, 'button', buttonData);
      createdEntries.set(buttonData.text.toLowerCase().replace(/\s+/g, '-'), entry);
    }

    // Create CTA block entries
    for (const ctaData of entriesData.ctaBlock) {
      await createEntry(environment, 'ctaBlock', ctaData);
    }

    console.log('All entries created successfully in draft status!');
    console.log('You can review and publish them in the Contentful web interface.');

  } catch (error) {
    console.error('Error adding entries:', error);
    throw error;
  }
}

// Run the script
addEntries().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
}); 