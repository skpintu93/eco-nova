import { Metadata } from 'next';
import { getLandingPageMetadata, getLandingPageSections } from '@/lib/contentful';
import { DynamicSection } from '@/components/sections/DynamicSection';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getLandingPageMetadata('en-US');
  
  if (!metadata) {
    return {
      title: 'Welcome',
      description: 'Welcome to our platform'
    };
  }

  return {
    title: metadata.title,
    description: metadata.metaDescription,
    openGraph: {
      title: metadata.title,
      description: metadata.metaDescription,
      images: metadata.metaImage ? [
        {
          url: `https:${metadata.metaImage.fields.file.url}`,
          width: metadata.metaImage.fields.file.details?.image?.width,
          height: metadata.metaImage.fields.file.details?.image?.height,
          alt: metadata.metaImage.fields.title
        }
      ] : undefined
    }
  };
}

export default async function HomePage() {
  const sections = await getLandingPageSections('/', 'en-US');


  return (
    <main>
      {sections.map((section) => (
        <DynamicSection key={section.sys.id} section={section} />
      ))}
    </main>
  );
}
