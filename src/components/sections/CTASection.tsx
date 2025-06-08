import { ContentfulEntry, CTASectionFields, SectionFields, ButtonFields, AssetFields } from '@/types/sections';
import { Section } from './Section';
import { getEntryById } from '@/lib/contentful';

interface ButtonProps extends ButtonFields {
  icon?: ContentfulEntry<AssetFields>;
}

export async function CTASection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<CTASectionFields>(section.fields.content.sys.id, section.sys.locale);
  const fields = entry.fields;

  const {
    title,
    subtitle,
    ctaButton,
    backgroundImage,
    backgroundColor,
    overlayOpacity = 0.5,
  } = fields;

  const button = ctaButton?.fields;

  const alignment = 'center';
  
  const buttonVariants: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-100 text-blue-600',
    outline: 'border-2 border-white hover:bg-white/10 text-white',
  };

  const containerClass = 'max-w-3xl mx-auto text-center';

  const contentClass = 'py-16';

  const buttonContainerClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[alignment];

  const textColor = backgroundColor ? 'text-white' : 'text-gray-900';

  return (
      <div className={`relative max-w-7xl mx-auto px-4 ${contentClass} ${textColor}`}>
        {backgroundImage && (
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage.fields.file.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div 
              className={`absolute inset-0 ${
                backgroundColor ? `bg-${backgroundColor}` : 'bg-black'
              }`}
              style={{ opacity: overlayOpacity }}
            />
          </div>
        )}

        <div className={`relative z-10 ${containerClass}`}>
          <div>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg mb-8 opacity-90">{subtitle}</p>
            )}
          </div>

          {button && (
            <div className={`flex flex-col sm:flex-row gap-4 ${buttonContainerClass}`}>
                <a
                  href={button.link}
                  className={`px-8 py-3 rounded-lg font-semibold text-center transition-colors ${
                    buttonVariants[button.variant || 'primary']
                  }`}
                >
                  {button.icon && (
                    <img
                      src={button.icon.fields.file.url}
                      alt={button.icon.fields.title}
                      className="w-5 h-5 inline-block mr-2"
                      width={button.icon.fields.file.details?.image?.width}
                      height={button.icon.fields.file.details?.image?.height}
                    />
                  )}    
                  {button.text}
                </a>
            </div>
          )}
        </div>
      </div>
  );
} 