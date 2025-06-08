import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

interface ContentTypeField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  localized: boolean;
  validations?: any[];
  linkType?: string;
  linkContentType?: string[];
  defaultValue?: Record<string, any>;
}

// Fields that should be localized for each content type
const localizedFields: Record<string, string[]> = {
  button: ['text', 'link'],
  ctaBlock: ['title', 'subtitle'],
  featureItem: ['title', 'description', 'link'],
  productSpec: ['name', 'value', 'unit', 'description'],
  testimonial: ['quote', 'authorName', 'authorTitle', 'company'],
  heroSection: ['title', 'subtitle'],
  featuresSection: ['title', 'longText'],
  productSpecsSection: ['title', 'subtitle'],
  testimonialsSection: ['title', 'subtitle'],
  ctaSection: ['title', 'subtitle'],
  landingPage: ['title', 'metaDescription'],
};

async function readContentTypes() {
  const contentTypesPath = path.join(__dirname, '..', 'contentful', 'content-types.json');
  const contentTypesData = await fs.readFile(contentTypesPath, 'utf-8');
  return JSON.parse(contentTypesData);
}

async function unpublishEntries(env: any, contentTypeId: string) {
  try {
    console.log(`\nUnpublishing entries for content type: ${contentTypeId}`);
    const entries = await env.getEntries({ content_type: contentTypeId, limit: 1000 });
    
    if (entries.items.length === 0) {
      console.log(`  No entries found for content type: ${contentTypeId}`);
      return true;
    }

    console.log(`  Found ${entries.items.length} entries to process`);
    let unpublishedCount = 0;
    let errorCount = 0;

    for (const entry of entries.items) {
      try {
        if (entry.isPublished()) {
          // Get fresh version of entry before unpublishing
          const freshEntry = await env.getEntry(entry.sys.id);
          await freshEntry.unpublish();
          unpublishedCount++;
          console.log(`  ✓ Unpublished entry: ${entry.sys.id}`);
        } else {
          console.log(`  - Entry already unpublished: ${entry.sys.id}`);
        }
      } catch (error: any) {
        errorCount++;
        console.error(`  ✗ Error unpublishing entry ${entry.sys.id}:`, error.message);
        if (error.status === 409) {
          // Version mismatch, try to get fresh version and unpublish again
          try {
            const freshEntry = await env.getEntry(entry.sys.id);
            await freshEntry.unpublish();
            unpublishedCount++;
            console.log(`  ✓ Unpublished entry after retry: ${entry.sys.id}`);
          } catch (retryError: any) {
            console.error(`  ✗ Failed to unpublish entry after retry ${entry.sys.id}:`, retryError.message);
          }
        }
      }
    }

    console.log(`\nUnpublish summary for ${contentTypeId}:`);
    console.log(`  - Total entries: ${entries.items.length}`);
    console.log(`  - Successfully unpublished: ${unpublishedCount}`);
    console.log(`  - Errors: ${errorCount}`);

    return errorCount === 0;
  } catch (error: any) {
    console.error(`Error fetching entries for ${contentTypeId}:`, error.message);
    return false;
  }
}

async function processContentType(env: any, contentType: any, existingContentType: any | null) {
  const contentTypeId = contentType.id;
  const fieldsToLocalize = localizedFields[contentTypeId] || [];

  // Special handling for navigationLink content type
  if (contentTypeId === 'navigationLink') {
    console.log('\nSpecial handling for navigationLink content type...');
    // First, try to unpublish all entries
    const unpublished = await unpublishEntries(env, contentTypeId);
    if (!unpublished) {
      console.log('⚠️ Some entries could not be unpublished. Please manually unpublish all navigationLink entries in the Contentful web interface and try again.');
      return;
    }
  }

  // Update fields to enable localization and fix link types
  const updatedFields = contentType.fields.map((field: ContentTypeField) => {
    const updatedField = {
      ...field,
      localized: fieldsToLocalize.includes(field.id)
    };

    // Handle Link fields properly
    if (field.type === 'Link') {
      // Remove linkContentType from the field object
      delete (updatedField as any).linkContentType;
      
      // Update validations to include linkContentType if needed
      if (field.validations) {
        const linkValidation = field.validations.find((v: any) => v.linkContentType);
        if (linkValidation) {
          updatedField.validations = [{
            linkContentType: linkValidation.linkContentType
          }];
        }
      }
    }

    // Special handling for Array fields in navigationLink
    if (contentTypeId === 'navigationLink' && field.type === 'Array') {
      updatedField.validations = [{
        linkContentType: ['navigationLink']
      }];
    }

    return updatedField;
  });

  const contentTypeData = {
    ...contentType,
    fields: updatedFields
  };

  try {
    if (existingContentType) {
      console.log(`\nProcessing content type: ${contentTypeId}`);
      
      // Get the latest version of the content type
      let latestContentType = await env.getContentType(contentTypeId);
      
      // Try to update
      try {
        latestContentType.fields = contentTypeData.fields;
        await latestContentType.update();
        console.log(`✓ Updated content type: ${contentTypeId}`);
      } catch (error: any) {
        if (error.status === 400 && error.message.includes('Previously published fields are invalid')) {
          console.log(`⚠️ Content type ${contentTypeId} has published entries. Attempting to unpublish...`);
          const unpublished = await unpublishEntries(env, contentTypeId);
          if (unpublished) {
            // Get fresh version and try update again
            latestContentType = await env.getContentType(contentTypeId);
            latestContentType.fields = contentTypeData.fields;
            await latestContentType.update();
            console.log(`✓ Updated content type: ${contentTypeId} after unpublishing entries`);
          } else {
            console.log(`⚠️ Could not unpublish all entries for ${contentTypeId}. Please manually unpublish entries in the Contentful web interface and try again.`);
            return;
          }
        } else {
          throw error;
        }
      }

      // Try to publish with retries
      let retries = 3;
      while (retries > 0) {
        try {
          await latestContentType.publish();
          console.log(`✓ Published content type: ${contentTypeId}`);
          break;
        } catch (error: any) {
          if (error.status === 409 && retries > 1) {
            // Version mismatch, get the latest version and try again
            console.log(`  Version mismatch, retrying publish... (${retries} attempts left)`);
            latestContentType = await env.getContentType(contentTypeId);
            await latestContentType.publish();
            console.log(`✓ Published content type: ${contentTypeId} after retry`);
            break;
          }
          retries--;
          if (retries === 0) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }
    } else {
      console.log(`\nCreating new content type: ${contentTypeId}`);
      const newContentType = await env.createContentType(contentTypeData);
      await newContentType.publish();
      console.log(`✓ Created and published content type: ${contentTypeId}`);
    }
  } catch (error: any) {
    console.error(`Error processing content type ${contentTypeId}:`, error.message);
    if (error.details?.errors) {
      console.error('Validation errors:', error.details.errors);
    }
  }
}

async function createContentTypes() {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);

    console.log('Reading content types from file...');
    const contentTypes = await readContentTypes();

    console.log('Getting existing content types...');
    const existingContentTypes = await env.getContentTypes();
    const existingContentTypeMap = new Map(
      existingContentTypes.items.map(ct => [ct.sys.id, ct])
    );

    console.log('\nCreating/Updating content types...');
    for (const contentType of contentTypes) {
      const existingContentType = existingContentTypeMap.get(contentType.id);
      await processContentType(env, contentType, existingContentType);
    }

    console.log('\nContent type creation and localization setup completed!');
    console.log('\nIMPORTANT: Before running the landing page script, please ensure that:');
    console.log('1. The Spanish locale (code: "es") is added in your Contentful space');
    console.log('2. All content types have been created and published');
    console.log('\nTo add the Spanish locale:');
    console.log('1. Go to Settings > Locales in your Contentful space');
    console.log('2. Click "Add locale"');
    console.log('3. Select "Spanish" and use the locale code "es"');
    console.log('4. Set "en-US" as the fallback locale');
    console.log('5. Click "Create"');
    console.log('\nAfter adding the locale, you can run: npm run add-landing-page');

  } catch (error) {
    console.error('Error creating content types:', error);
    process.exit(1);
  }
}

// Run the script
createContentTypes().catch(console.error); 