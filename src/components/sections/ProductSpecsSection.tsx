import { ContentfulEntry, ProductSpecsSectionFields, SectionFields, ProductSpecFields } from '@/types/sections';
import { Section } from './Section';
import { getEntryById } from '@/lib/contentful';

export async function ProductSpecsSection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<ProductSpecsSectionFields>(section.fields.content.sys.id);
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
      <div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {specs.map((spec: ContentfulEntry<ProductSpecFields>) => (
                <tr 
                  key={spec.sys.id}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="py-4 px-6 font-semibold w-1/3">
                    {spec.fields.icon && (
                      <img
                        src={spec.fields.icon.fields.file.url}
                        alt={spec.fields.icon.fields.title}
                        className="w-6 h-6 inline-block mr-2"
                        width={spec.fields.icon.fields.file.details?.image?.width}
                        height={spec.fields.icon.fields.file.details?.image?.height}
                      />
                    )}
                    {spec.fields.name}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">
                      {spec.fields.value}
                      {spec.fields.unit && (
                        <span className="text-gray-500 ml-1">{spec.fields.unit}</span>
                      )}
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
    );
  }

  const containerClass = layout === 'list' 
    ? 'space-y-6'
    : `grid ${gridCols} gap-6`;

  return (
    <div>
      <div className={containerClass}>
        {specs.map((spec: ContentfulEntry<ProductSpecFields>) => (
          <div 
            key={spec.sys.id}
            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {spec.fields.icon && (
                <img
                  src={spec.fields.icon.fields.file.url}
                  alt={spec.fields.icon.fields.title}
                  className="w-6 h-6 mt-1"
                  width={spec.fields.icon.fields.file.details?.image?.width}
                  height={spec.fields.icon.fields.file.details?.image?.height}
                />
              )}
              <div>
                <h3 className="font-semibold">{spec.fields.name}</h3>
                <p className="text-gray-900 mt-1">
                  {spec.fields.value}
                  {spec.fields.unit && (
                    <span className="text-gray-500 ml-1">{spec.fields.unit}</span>
                  )}
                </p>
                {spec.fields.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {spec.fields.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 