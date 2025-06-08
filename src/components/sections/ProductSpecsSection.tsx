import { ContentfulEntry, ProductSpecsSectionFields, SectionFields, ProductSpecFields } from '@/types/sections';
import { getEntryById } from '@/lib/contentful';
import Image from 'next/image';

export async function ProductSpecsSection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<ProductSpecsSectionFields>(section.fields.content.sys.id, section.sys.locale);
  const fields = entry.fields;

  const { 
    title,
    subtitle,
    specs, 
    layout = 'grid', 
    backgroundColor,
  } = fields;

  const gridCols = 'grid-cols-1 md:grid-cols-2';

  if (layout === 'table') {
    return (
      <div className={`${backgroundColor ? `bg-[${backgroundColor}]` : ''} py-16`}>
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {specs.map((spec: ContentfulEntry<ProductSpecFields>) => (
                  <tr 
                    key={spec.sys.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-4 px-6 font-semibold w-1/3">
                      {spec.fields.images?.[1] && (
                        <Image
                          src={`https:${spec.fields.images[1].fields.file.url}`}
                          alt={spec.fields.images[1].fields.title || ''}
                          className="inline-block mr-2"
                          width={24}
                          height={24}
                          style={{ width: '24px', height: '24px' }}
                          priority={false}
                        />
                      )}
                      {spec.fields.title}
                    </td>
                    <td className="py-4 px-6">
                      {spec.fields.images?.[0] && (
                        <div className="mb-4 rounded-lg overflow-hidden relative aspect-[16/9]">
                          <Image
                            src={`https:${spec.fields.images[0].fields.file.url}`}
                            alt={spec.fields.images[0].fields.title || ''}
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={false}
                            quality={85}
                          />
                        </div>
                      )}
                      <div className="font-medium">
                        {spec.fields.specifications.join(', ')}
                      </div>
                      {spec.fields.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {spec.fields.description}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const containerClass = layout === 'list' 
    ? 'space-y-6'
    : `grid ${gridCols} gap-6`;

  return (
    <div className={`${backgroundColor ? `bg-[${backgroundColor}]` : ''} py-16`}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={containerClass}>
          {specs.map((spec: ContentfulEntry<ProductSpecFields>) => (
            <div 
              key={spec.sys.id}
              className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Container - Square on large screens, full width on small */}
                {spec.fields.images?.[0] && (
                  <div className="w-full md:w-48 flex-shrink-0">
                    <div className="aspect-square rounded-lg overflow-hidden relative">
                      <Image
                        src={`https:${spec.fields.images[0].fields.file.url}`}
                        alt={spec.fields.images[0].fields.title || ''}
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        fill
                        sizes="(max-width: 768px) 100vw, 192px"
                        priority={false}
                        quality={85}
                      />
                    </div>
                  </div>
                )}
                
                {/* Content Container */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    {/* Small Icon */}
                    {spec.fields.images?.[1] && (
                      <div className="relative w-6 h-6 mt-1">
                        <Image
                          src={`https:${spec.fields.images[1].fields.file.url}`}
                          alt={spec.fields.images[1].fields.title || ''}
                          fill
                          sizes="24px"
                          priority={false}
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{spec.fields.title}</h3>
                      <p className="text-gray-900 mt-1">
                        {spec.fields.specifications.join(', ')}
                      </p>
                      {spec.fields.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {spec.fields.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 