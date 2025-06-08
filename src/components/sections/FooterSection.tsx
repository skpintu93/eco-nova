import { ContentfulEntry, FooterSectionFields, SectionFields, SocialLinkFields, FooterColumnFields, NavigationLink } from '@/types/sections';
import { Section } from './Section';
import { getEntryById } from '@/lib/contentful';

export async function FooterSection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<FooterSectionFields>(section.fields.content.sys.id, section.sys.locale);
  const fields = entry.fields;

  const {
    logo,
    tagline,
    columns = [],
    socialLinks = [],
    bottomLinks = [],
    copyrightText,
    backgroundColor,
    accentColor ,
    showDivider = true,
    layout = 'standard',
  } = fields;

  console.log(fields, 'fields');

  const renderSocialLinks = () => {
    if (!socialLinks.length) return null;

    return (
      <div className="flex gap-4 mb-8">
        {socialLinks.map((link: ContentfulEntry<SocialLinkFields>) => (
          <a
            key={link.sys.id}
            href={link.fields.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors`}
            aria-label={link.fields.platform}
          >
            {link.fields.icon ? (
              <img
                src={link.fields.icon.fields.file.url}
                alt={link.fields.platform}
                className="w-6 h-6"
                width={link.fields.icon.fields.file.details?.image?.width}
                height={link.fields.icon.fields.file.details?.image?.height}
              />
            ) : (
              <span className="text-2xl">{link.fields.platform}</span>
            )}
          </a>
        ))}
      </div>
    );
  };

  const renderColumns = () => {
    if (!columns.length) return null;

    return (
      <div className={`grid grid-cols-1 md:grid-cols-${columns.length} gap-8 mb-8`}>
        {columns.map((column: ContentfulEntry<FooterColumnFields>) => (
          <div key={column.sys.id}>
            {column.fields.heading && (
              <h3 className={`text-lg font-semibold mb-4 `}>
                {column.fields.heading}
              </h3>
            )}
            {column.fields.links && (
              <ul className="space-y-2">
                {column.fields.links.map((link: ContentfulEntry<NavigationLink>) => (
                  <li key={link.sys.id}>
                    <a
                      href={link.fields.url}
                      className={` transition-colors`}
                    >
                      {link.fields.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {column.fields.content && (
              <div className="prose prose-invert max-w-none">
                {column.fields.content}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderBottomLinks = () => {
    if (!bottomLinks.length) return null;

    return (
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {bottomLinks.map((link: ContentfulEntry<NavigationLink>) => (
          <a
            key={link.sys.id}
            href={link.fields.url}
            className={`transition-colors`}
          >
            {link.fields.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: backgroundColor || '#000', color: accentColor || '#fff' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          {logo && (
            <img
              src={logo.fields.file.url}
              alt={logo.fields.title}
              className="w-14 h-14 object-cover rounded mb-4"
              width={56}
              height={56}
            />
          )}
          {tagline && (
            <p className="text-lg max-w-2xl">{tagline}</p>
          )}
        </div>

        {layout === 'standard' && (
          <>
            {renderSocialLinks()}
            {renderColumns()}
            {showDivider && (
              <hr className="border-gray-800 my-8" />
            )}
            {renderBottomLinks()}
            {copyrightText && (
              <p className="text-center text-sm">
                {copyrightText}
              </p>
            )}
          </>
        )}

        {layout === 'minimal' && (
          <div className="flex flex-col items-center">
            {renderSocialLinks()}
            {renderBottomLinks()}
            {copyrightText && (
              <p className="text-center text-sm mt-4">
                {copyrightText}
              </p>
            )}
          </div>
        )}

        {layout === 'expanded' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {logo && (
                <img
                  src={logo.fields.file.url}
                  alt={logo.fields.title}
                  className="w-14 h-14 object-cover rounded mb-4"
                  width={56}
                  height={56}
                />
              )}
              {tagline && (
                <p className="text-lg mb-6">{tagline}</p>
              )}
              {renderSocialLinks()}
            </div>
            <div>
              {renderColumns()}
              {showDivider && (
                <hr className="border-gray-800 my-8" />
              )}
              {renderBottomLinks()}
              {copyrightText && (
                <p className="text-sm">
                  {copyrightText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 