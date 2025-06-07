import { GraphQLClient } from 'graphql-request';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('Missing env.CONTENTFUL_SPACE_ID');
}
if (!process.env.CONTENTFUL_ENVIRONMENT) {
  throw new Error('Missing env.CONTENTFUL_ENVIRONMENT');
}
if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing env.CONTENTFUL_ACCESS_TOKEN');
}

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;

export const contentfulClient = new GraphQLClient(CONTENTFUL_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
}); 