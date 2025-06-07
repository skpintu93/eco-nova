import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const {
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT = 'master',
} = process.env;

if (!CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_SPACE_ID) {
  throw new Error('Required environment variables are missing');
}

const managementToken: string = CONTENTFUL_MANAGEMENT_TOKEN;
const spaceId: string = CONTENTFUL_SPACE_ID;
const envId: string = CONTENTFUL_ENVIRONMENT;

const client = createClient({
  accessToken: managementToken,
});

interface DraftOptions {
  contentType?: string;
  entryIds?: string[];
  all?: boolean;
}

async function unpublishEntry(entry: any) {
  try {
    if (entry.isPublished()) {
      await entry.unpublish();
      console.log(`Unpublished entry: ${entry.sys.id} (${entry.fields.title?.['en-US'] || 'Untitled'})`);
    }
    return entry;
  } catch (error) {
    console.error(`Error unpublishing entry ${entry.sys.id}:`, error);
    throw error;
  }
}

async function draftEntries(options: DraftOptions = { all: true }) {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);

    let entries;
    if (options.entryIds) {
      // Get specific entries by ID
      entries = await Promise.all(
        options.entryIds.map(id => env.getEntry(id))
      );
    } else if (options.contentType) {
      // Get entries of a specific content type
      entries = await env.getEntries({
        content_type: options.contentType,
        limit: 1000, // Adjust this based on your needs
      });
      entries = entries.items;
    } else if (options.all) {
      // Get all entries
      entries = await env.getEntries({
        limit: 1000, // Adjust this based on your needs
      });
      entries = entries.items;
    } else {
      throw new Error('No valid options provided. Please specify contentType, entryIds, or set all to true.');
    }

    console.log(`Found ${entries.length} entries to process`);

    // Group entries by content type for better visibility
    const entriesByType = entries.reduce((acc: { [key: string]: any[] }, entry: any) => {
      const type = entry.sys.contentType.sys.id;
      if (!acc[type]) acc[type] = [];
      acc[type].push(entry);
      return acc;
    }, {});

    // Process entries by content type
    for (const [contentType, typeEntries] of Object.entries(entriesByType)) {
      console.log(`\nProcessing ${typeEntries.length} entries of type: ${contentType}`);
      
      for (const entry of typeEntries) {
        try {
          await unpublishEntry(entry);
        } catch (error) {
          console.error(`Failed to process entry ${entry.sys.id}:`, error);
          // Continue with next entry even if one fails
          continue;
        }
      }
    }

    console.log('\nDraft process completed!');
    console.log('All entries are now in draft status.');
    console.log('Review them in the Contentful web interface before publishing.');

  } catch (error) {
    console.error('Error drafting entries:', error);
    throw error;
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: DraftOptions = {};

if (args.includes('--type')) {
  const typeIndex = args.indexOf('--type');
  options.contentType = args[typeIndex + 1];
} else if (args.includes('--ids')) {
  const idsIndex = args.indexOf('--ids');
  options.entryIds = args[idsIndex + 1].split(',');
} else {
  options.all = true;
}

// Run the script
draftEntries(options).catch(console.error); 