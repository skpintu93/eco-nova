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

async function exportContentTypes() {
  try {
    console.log('Connecting to Contentful...');
    const space = await client.getSpace(CONTENTFUL_SPACE_ID as string);
    const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

    console.log('Fetching content types...');
    const contentTypes = await environment.getContentTypes();
    
    // Transform the content types to a more readable format
    const contentTypesData = contentTypes.items.map(contentType => ({
      id: contentType.sys.id,
      name: contentType.name,
      displayField: contentType.displayField,
      description: contentType.description,
      fields: contentType.fields.map(field => {
        const baseField = {
          id: field.id,
          name: field.name,
          type: field.type,
          required: field.required,
          localized: field.localized,
          validations: field.validations,
          defaultValue: field.defaultValue
        };

        // Add link-specific properties if they exist
        if ('linkType' in field) {
          return {
            ...baseField,
            linkType: field.linkType,
            ...(field.validations?.some(v => 'linkContentType' in v) && {
              linkContentType: field.validations.find(v => 'linkContentType' in v)?.linkContentType
            })
          };
        }

        return baseField;
      })
    }));

    // Create the output directory if it doesn't exist
    const outputDir = path.join(__dirname, '..', 'contentful');
    await fs.mkdir(outputDir, { recursive: true });

    // Write the content types to a JSON file
    const outputPath = path.join(outputDir, 'content-types.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify(contentTypesData, null, 2),
      'utf-8'
    );

    console.log(`Content types exported to: ${outputPath}`);
    console.log(`Found ${contentTypesData.length} content types:`);
    contentTypesData.forEach(ct => {
      console.log(`- ${ct.name} (${ct.id})`);
    });

  } catch (error) {
    console.error('Error exporting content types:', error);
    throw error;
  }
}

// Run the export
exportContentTypes().catch(error => {
  console.error('Export failed:', error);
  process.exit(1);
}); 