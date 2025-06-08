import { type FeaturesSectionProps } from '@/types/sections';
import { Section } from './Section';

export function FeaturesSection({ fields, className }: FeaturesSectionProps) {
  const { features, layout = 'grid', columns = 3, showIcons = true } = fields;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  const containerClass = layout === 'list' 
    ? 'space-y-8'
    : layout === 'cards'
    ? `grid ${gridCols} gap-8`
    : `grid ${gridCols} gap-12`;

  return (
    <Section fields={fields} className={className}>
      <div className={containerClass}>
        {features.map((feature, index) => (
          <div 
            key={index}
            className={layout === 'cards' 
              ? 'p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow'
              : 'flex flex-col items-center text-center'
            }
          >
            {showIcons && feature.icon && (
              <img
                src={feature.icon.url}
                alt={feature.icon.alt}
                className="w-12 h-12 mb-4"
                width={feature.icon.width}
                height={feature.icon.height}
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
} 