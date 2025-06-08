import { getLandingPageSections } from '@/lib/contentful';
import { DynamicSection } from '@/components/sections/DynamicSection';

export const revalidate = 3600; // Revalidate every hour

export default async function LandingPage() {
  const sections = await getLandingPageSections();

  return (
    <main>
      {sections.map((section) => (
        <DynamicSection key={section.sys.id} section={section} />
      ))}
    </main>
  );
}
