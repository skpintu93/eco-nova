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

// Now we can safely use these variables as they are checked
const managementToken: string = CONTENTFUL_MANAGEMENT_TOKEN;
const spaceId: string = CONTENTFUL_SPACE_ID;
const envId: string = CONTENTFUL_ENVIRONMENT;

const client = createClient({
  accessToken: managementToken,
});

interface ButtonData {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

interface CtaBlockData {
  title: string;
  subtitle?: string;
  primaryButton: string; // Reference to button entry
  secondaryButton?: string; // Reference to button entry
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: string; // Reference to asset
}

interface FeatureItemData {
  title: string;
  description?: string;
  icon?: string; // Reference to asset
  link?: string;
}

interface ProductSpecData {
  name: string;
  value: string;
  unit?: string;
  icon?: string; // Reference to asset
  description?: string;
}

interface TestimonialData {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorImage?: string; // Reference to asset
  rating?: number;
  company?: string;
}

interface SectionData {
  type: 'hero' | 'features' | 'testimonials' | 'productSpecs' | 'cta';
  content: string; // Reference to section content entry
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
}

interface LandingPageData {
  title: string;
  slug: string;
  metaDescription?: string;
  metaImage?: string; // Reference to asset
  sections: string[]; // References to section entries
  status: 'draft' | 'published';
}

async function createEntry(contentTypeId: string, data: any) {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);
    const entry = await env.createEntry(contentTypeId, { fields: data });
    console.log(`Created ${contentTypeId} entry: ${entry.sys.id}`);
    return entry.sys.id;
  } catch (error) {
    console.error(`Error creating ${contentTypeId} entry:`, error);
    throw error;
  }
}

async function createLandingPage() {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);

    // 1. Create Buttons
    const buttons = {
      primary: await createEntry('button', {
        text: { 'en-US': 'Get Started' },
        link: { 'en-US': '/signup' },
        variant: { 'en-US': 'primary' },
        size: { 'en-US': 'large' },
      }),
      secondary: await createEntry('button', {
        text: { 'en-US': 'Learn More' },
        link: { 'en-US': '/about' },
        variant: { 'en-US': 'secondary' },
      }),
      outline: await createEntry('button', {
        text: { 'en-US': 'View Documentation' },
        link: { 'en-US': '/docs' },
        variant: { 'en-US': 'outline' },
      }),
    };

    // 2. Create CTA Blocks
    const ctaBlocks = {
      main: await createEntry('ctaBlock', {
        title: { 'en-US': 'Ready to Transform Your Experience?' },
        subtitle: { 'en-US': 'Join thousands of satisfied customers who have already made the switch.' },
        primaryButton: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: buttons.primary } } },
        secondaryButton: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: buttons.secondary } } },
        alignment: { 'en-US': 'center' },
      }),
      secondary: await createEntry('ctaBlock', {
        title: { 'en-US': 'Need Help Getting Started?' },
        subtitle: { 'en-US': 'Our team is here to help you every step of the way.' },
        primaryButton: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: buttons.outline } } },
        alignment: { 'en-US': 'center' },
      }),
    };

    // 3. Create Feature Items
    const featureItems = await Promise.all([
      createEntry('featureItem', {
        title: { 'en-US': 'Lightning Fast Performance' },
        description: { 'en-US': 'Experience blazing fast speeds with our optimized infrastructure.' },
        link: { 'en-US': '/features/performance' },
      }),
      createEntry('featureItem', {
        title: { 'en-US': 'Advanced Security' },
        description: { 'en-US': 'Enterprise-grade security to keep your data safe and protected.' },
        link: { 'en-US': '/features/security' },
      }),
      createEntry('featureItem', {
        title: { 'en-US': '24/7 Support' },
        description: { 'en-US': 'Round-the-clock support from our dedicated team of experts.' },
        link: { 'en-US': '/support' },
      }),
    ]);

    // 4. Create Product Specs
    const productSpecs = await Promise.all([
      createEntry('productSpec', {
        name: { 'en-US': 'Processing Speed' },
        value: { 'en-US': '10x' },
        description: { 'en-US': 'Faster than traditional solutions' },
      }),
      createEntry('productSpec', {
        name: { 'en-US': 'Uptime' },
        value: { 'en-US': '99.99' },
        unit: { 'en-US': '%' },
        description: { 'en-US': 'Guaranteed service availability' },
      }),
      createEntry('productSpec', {
        name: { 'en-US': 'Response Time' },
        value: { 'en-US': '50' },
        unit: { 'en-US': 'ms' },
        description: { 'en-US': 'Average API response time' },
      }),
    ]);

    // 5. Create Testimonials
    const testimonials = await Promise.all([
      createEntry('testimonial', {
        quote: { 'en-US': 'This platform has completely transformed how we operate. The efficiency gains are incredible.' },
        authorName: { 'en-US': 'Sarah Johnson' },
        authorTitle: { 'en-US': 'CTO' },
        company: { 'en-US': 'TechCorp' },
        rating: { 'en-US': 5 },
      }),
      createEntry('testimonial', {
        quote: { 'en-US': 'The best decision we made was switching to this platform. Our productivity has soared.' },
        authorName: { 'en-US': 'Michael Chen' },
        authorTitle: { 'en-US': 'Product Manager' },
        company: { 'en-US': 'InnovateX' },
        rating: { 'en-US': 5 },
      }),
    ]);

    // 6. Create Sections
    const sections = await Promise.all([
      // Hero Section
      createEntry('heroSection', {
        title: { 'en-US': 'Welcome to the Future of Innovation' },
        subtitle: { 'en-US': 'Experience the next generation of technology that will transform your business.' },
        ctaButton: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: buttons.primary } } },
        alignment: { 'en-US': 'center' },
        backgroundColor: { 'en-US': '#ffffff' },
        overlayOpacity: { 'en-US': 0.5 }
      }),

      // Features Section
      createEntry('featuresSection', {
        title: { 'en-US': 'Why Choose Us' },
        longText: { 'en-US': 'Discover the features that set us apart from the competition.' },
        features: { 'en-US': featureItems.map(id => ({ sys: { type: 'Link', linkType: 'Entry', id } })) },
        layout: { 'en-US': 'grid' },
        columns: { 'en-US': 3 },
      }),

      // Product Specs Section
      createEntry('productSpecsSection', {
        title: { 'en-US': 'Technical Specifications' },
        subtitle: { 'en-US': 'See what makes our platform stand out' },
        specs: { 'en-US': productSpecs.map(id => ({ sys: { type: 'Link', linkType: 'Entry', id } })) },
        layout: { 'en-US': 'grid' },
      }),

      // Testimonials Section - Using only the first testimonial as a single link
      createEntry('testimonialsSection', {
        title: { 'en-US': 'What Our Customers Say' },
        subtitle: { 'en-US': 'Join thousands of satisfied customers' },
        testimonials: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: testimonials[0] } } },
        layout: { 'en-US': 'grid' },
      }),

      // CTA Section
      createEntry('ctaSection', {
        title: { 'en-US': 'Ready to Get Started?' },
        subtitle: { 'en-US': 'Join us today and transform your business' },
        ctaBlock: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: ctaBlocks.main } } },
      }),
    ]);

    // 7. Create Section Wrappers
    const sectionWrappers = await Promise.all(
      sections.map((sectionId, index) =>
        createEntry('section', {
          type: { 'en-US': ['hero', 'features', 'productSpecs', 'testimonials', 'cta'][index] },
          content: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: sectionId } } },
          padding: { 'en-US': 'large' },
          margin: { 'en-US': 'medium' },
        })
      )
    );

    // 8. Create Landing Page
    const landingPage = await createEntry('landingPage', {
      title: { 'en-US': 'Welcome to Our Platform' },
      slug: { 'en-US': 'home' },
      metaDescription: { 'en-US': 'Experience the future of innovation with our cutting-edge platform.' },
      sections: { 'en-US': sectionWrappers.map(id => ({ sys: { type: 'Link', linkType: 'Entry', id } })) },
      status: { 'en-US': 'draft' },
    });

    console.log('Landing page created successfully!');
    console.log('Landing Page ID:', landingPage);
    console.log('\nAll entries are created in draft status.');
    console.log('Review them in the Contentful web interface before publishing.');

  } catch (error) {
    console.error('Error creating landing page:', error);
    throw error;
  }
}

// Run the script
createLandingPage().catch(console.error); 