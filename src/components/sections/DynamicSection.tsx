import { ContentfulEntry, SectionFields, type SectionEntry } from '@/types/sections';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ProductSpecsSection } from './ProductSpecsSection';
import { CTASection } from './CTASection';
import { FooterSection } from './FooterSection';
import { Section } from './Section';
import { SectionType } from '@/lib/contentful';

const sectionComponents: Record<SectionType, React.ComponentType<{ section: ContentfulEntry<SectionFields> }>> = {
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  productSpecs: ProductSpecsSection,
  cta: CTASection, 
  footer: FooterSection,
};

interface DynamicSectionProps {
  section: ContentfulEntry<SectionFields>;
}

export function DynamicSection({ section }: DynamicSectionProps) {
  const contentType = section.fields.type;
  const Component = sectionComponents[contentType];

  if (!Component) {
    console.warn(`No component found for content type: ${contentType}`);
    return null;
  }

  return (
    <Section fields={section.fields}>
      <Component section={section} />
    </Section>
  );
} 