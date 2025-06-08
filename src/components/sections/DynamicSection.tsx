import { type SectionEntry } from '@/types/sections';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ProductSpecsSection } from './ProductSpecsSection';
import { CTASection } from './CTASection';
import { FooterSection } from './FooterSection';

const sectionComponents: Record<string, React.ComponentType<{ fields: any; className?: string }>> = {
  heroSection: HeroSection,
  featuresSection: FeaturesSection,
  testimonialsSection: TestimonialsSection,
  productSpecsSection: ProductSpecsSection,
  ctaSection: CTASection,
  footerSection: FooterSection,
};

interface DynamicSectionProps {
  section: SectionEntry;
  className?: string;
}

export function DynamicSection({ section, className }: DynamicSectionProps) {
  const contentType = section.sys.contentType.sys.id;
  const Component = sectionComponents[contentType];

  if (!Component) {
    console.warn(`No component found for content type: ${contentType}`);
    return null;
  }

  return <Component fields={section.fields} className={className} />;
} 