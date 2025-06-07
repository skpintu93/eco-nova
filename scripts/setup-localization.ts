import pkg from 'contentful-management';
const { createClient } = pkg;
import type { ContentType as CMContentType, ContentFields } from 'contentful-management';
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

interface ContentTypeField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  localized: boolean;
  validations: any[];
  [key: string]: any;
}

interface ContentType {
  id: string;
  name: string;
  displayField: string;
  fields: ContentTypeField[];
  [key: string]: any;
}

interface FieldsToLocalize {
  common: string[];
  specific: {
    [key: string]: string[];
  };
}

const fieldsToLocalize: FieldsToLocalize = {
  // Common fields across content types
  common: ['title', 'subtitle', 'description', 'metaDescription', 'text', 'name', 'value', 'quote', 'authorName', 'authorTitle', 'company', 'longText'],
  // Content type specific fields
  specific: {
    button: ['link'],
    navigationLink: ['url'],
    socialLink: ['url'],
  }
};

async function updateContentType(contentType: CMContentType) {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);
    const contentTypeInstance = await env.getContentType(contentType.sys.id);

    // Update fields to be localized
    contentTypeInstance.fields = contentTypeInstance.fields.map((field: ContentFields) => {
      // Check if field should be localized
      const shouldLocalize = 
        fieldsToLocalize.common.includes(field.id) || 
        (contentType.sys.id in fieldsToLocalize.specific && 
         fieldsToLocalize.specific[contentType.sys.id].includes(field.id));

      if (shouldLocalize) {
        return {
          ...field,
          localized: true
        };
      }
      return field;
    });

    // Update the content type
    const updatedContentType = await contentTypeInstance.update();
    console.log(`Updated ${contentType.sys.id} to support localization`);
    return updatedContentType;
  } catch (error) {
    console.error(`Error updating ${contentType.sys.id}:`, error);
    throw error;
  }
}

async function setupLocalization() {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);
    
    // Get all content types
    const contentTypes = await env.getContentTypes();
    
    // Update each content type
    for (const contentType of contentTypes.items) {
      await updateContentType(contentType as CMContentType);
    }

    console.log('Localization setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update your entries with localized content');
    console.log('2. Update your GraphQL queries to fetch localized content');
    console.log('3. Update your frontend components to handle localized content');

  } catch (error) {
    console.error('Error setting up localization:', error);
    throw error;
  }
}

// Run the script
setupLocalization().catch(console.error); 