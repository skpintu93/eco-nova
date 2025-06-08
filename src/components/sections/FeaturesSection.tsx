import {
  ContentfulEntry,
  FeaturesSectionFields,
  SectionFields,
  FeatureItemFields,
} from '@/types/sections';
import { getEntryById } from '@/lib/contentful';

export async function FeaturesSection({
  section,
}: {
  section: ContentfulEntry<SectionFields>;
}) {
  const entry = await getEntryById<FeaturesSectionFields>(section.fields.content.sys.id, section.sys.locale);

  const fields = entry.fields;

  const { features, layout = 'grid', columns = 3 } = fields;

  const gridCols: Record<1 | 2 | 3 | 4, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const containerClass =
    layout === 'list'
      ? 'space-y-8'
      : layout === 'cards'
      ? `grid ${
          gridCols[columns as keyof typeof gridCols] || gridCols[3]
        } gap-8`
      : `grid ${
          gridCols[columns as keyof typeof gridCols] || gridCols[3]
        } gap-12`;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className={containerClass}>
        {features.map(
          (feature: ContentfulEntry<FeatureItemFields>, index: number) => (
            <div
              key={feature.sys.id}
              className={
                layout === 'cards'
                  ? 'p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow'
                  : 'flex flex-col items-center text-center'
              }
            >
              {feature.fields.icon && (
                <img
                  src={feature.fields.icon.fields.file.url}
                  alt={feature.fields.icon.fields.title}
                  className='w-12 h-12 mb-4'
                  width={feature.fields.icon.fields.file.details?.image?.width}
                  height={
                    feature.fields.icon.fields.file.details?.image?.height
                  }
                />
              )}
              <h3 className='text-xl font-semibold mb-2'>
                {feature.fields.title}
              </h3>
              <p className='text-gray-600'>{feature.fields.description}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
