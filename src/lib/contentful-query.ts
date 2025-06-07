import { contentfulClient } from './contentful';

export class ContentfulError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ContentfulError';
  }
}

export async function fetchContentful<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await contentfulClient.request<T>(query, variables);
    return response;
  } catch (error: unknown) {
    // Handle GraphQL and network errors
    if (error && typeof error === 'object' && 'response' in error) {
      const graphqlError = error as { response?: { status?: number; errors?: unknown } };
      const statusCode = graphqlError.response?.status || 500;
      const details = graphqlError.response?.errors || 'Unknown GraphQL error';
      
      throw new ContentfulError(
        'Failed to fetch data from Contentful',
        statusCode,
        details
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      throw new ContentfulError(
        `Contentful request failed: ${error.message}`,
        500
      );
    }

    // Handle unknown errors
    throw new ContentfulError(
      'An unexpected error occurred while fetching from Contentful',
      500
    );
  }
}

// Example usage with type safety:
/*
interface BlogPost {
  title: string;
  content: string;
  // ... other fields
}

const GET_BLOG_POST = `
  query GetBlogPost($slug: String!) {
    blogPostCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        content
      }
    }
  }
`;

// In your component or API route:
try {
  const { blogPostCollection } = await fetchContentful<{
    blogPostCollection: { items: BlogPost[] }
  }>(GET_BLOG_POST, { slug: 'my-blog-post' });
  
  const post = blogPostCollection.items[0];
} catch (error) {
  if (error instanceof ContentfulError) {
    // Handle specific Contentful errors
    console.error(`Contentful error: ${error.message}`, error.details);
  } else {
    // Handle other errors
    console.error('Unexpected error:', error);
  }
}
*/ 