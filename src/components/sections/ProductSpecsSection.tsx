import { type ProductSpecsSectionProps } from '@/types/sections';
import { Section } from './Section';

export function ProductSpecsSection({ fields, className }: ProductSpecsSectionProps) {
  const { 
    specs, 
    layout = 'grid', 
    columns = 2, 
    showIcons = true,
    showUnits = true,
    highlightImportant = false
  } = fields;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2';

  if (layout === 'table') {
    return (
      <Section fields={fields} className={className}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {specs.map((spec, index) => (
                <tr 
                  key={index}
                  className={`border-b border-gray-200 last:border-b-0 ${
                    highlightImportant && spec.highlight ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-semibold w-1/3">
                    {showIcons && spec.icon && (
                      <img
                        src={spec.icon.url}
                        alt={spec.icon.alt}
                        className="w-6 h-6 inline-block mr-2"
                        width={spec.icon.width}
                        height={spec.icon.height}
                      />
                    )}
                    {spec.name}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">
                      {spec.value}
                      {showUnits && spec.unit && (
                        <span className="text-gray-500 ml-1">{spec.unit}</span>
                      )}
                    </div>
                    {spec.description && (
                      <div className="text-sm text-gray-600 mt-1">
                        {spec.description}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    );
  }

  const containerClass = layout === 'list' 
    ? 'space-y-6'
    : `grid ${gridCols} gap-6`;

  return (
    <Section fields={fields} className={className}>
      <div className={containerClass}>
        {specs.map((spec, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${
              highlightImportant && spec.highlight ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {showIcons && spec.icon && (
                <img
                  src={spec.icon.url}
                  alt={spec.icon.alt}
                  className="w-6 h-6 mt-1"
                  width={spec.icon.width}
                  height={spec.icon.height}
                />
              )}
              <div>
                <h3 className="font-semibold">{spec.name}</h3>
                <p className="text-gray-900 mt-1">
                  {spec.value}
                  {showUnits && spec.unit && (
                    <span className="text-gray-500 ml-1">{spec.unit}</span>
                  )}
                </p>
                {spec.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {spec.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
} 