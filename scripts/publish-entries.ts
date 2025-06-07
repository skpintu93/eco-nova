import pkg from 'contentful-management';
const { createClient } = pkg;
import * as dotenv from 'dotenv';
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

interface PublishOptions {
  contentType?: string;  // Publish entries of specific content type
  entryIds?: string[];  // Publish specific entries by ID
  all?: boolean;        // Publish all draft entries
}

async function publishEntries(options: PublishOptions = { all: true }) {
  try {
    console.log('Connecting to Contentful...');
    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    let entries;
    if (options.entryIds) {
      // Publish specific entries by ID
      console.log(`Fetching specific entries: ${options.entryIds.join(', ')}`);
      entries = await Promise.all(
        options.entryIds.map(id => environment.getEntry(id))
      );
    } else if (options.contentType) {
      // Publish all entries of a specific content type
      console.log(`Fetching draft entries of type: ${options.contentType}`);
      entries = await environment.getEntries({
        content_type: options.contentType,
        'sys.publishedAt[exists]': false
      });
      entries = entries.items;
    } else {
      // Publish all draft entries
      console.log('Fetching all draft entries...');
      entries = await environment.getEntries({
        'sys.publishedAt[exists]': false
      });
      entries = entries.items;
    }

    if (entries.length === 0) {
      console.log('No draft entries found to publish.');
      return;
    }

    console.log(`Found ${entries.length} draft entries to publish.`);

    // Group entries by content type for better logging
    const entriesByType = entries.reduce((acc, entry) => {
      const type = entry.sys.contentType.sys.id;
      if (!acc[type]) acc[type] = [];
      acc[type].push(entry);
      return acc;
    }, {} as Record<string, any[]>);

    // Publish entries
    for (const [contentType, typeEntries] of Object.entries(entriesByType)) {
      console.log(`\nPublishing ${typeEntries.length} entries of type ${contentType}:`);
      
      for (const entry of typeEntries) {
        try {
          await entry.publish();
          console.log(`✓ Published ${contentType} entry: ${entry.sys.id} (${entry.fields.title?.['en-US'] || entry.fields.text?.['en-US'] || 'Untitled'})`);
        } catch (error) {
          console.error(`✗ Failed to publish ${contentType} entry ${entry.sys.id}:`, error);
        }
      }
    }

    console.log('\nPublishing completed!');

  } catch (error) {
    console.error('Error publishing entries:', error);
    throw error;
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options: PublishOptions = {};

if (args.includes('--type')) {
  const typeIndex = args.indexOf('--type');
  options.contentType = args[typeIndex + 1];
} else if (args.includes('--ids')) {
  const idsIndex = args.indexOf('--ids');
  options.entryIds = args[idsIndex + 1].split(',');
} else {
  options.all = true;
}

// Run the publish script
publishEntries(options).catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
}); 