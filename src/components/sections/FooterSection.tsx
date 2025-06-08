import { type FooterSectionProps } from '@/types/sections';
import { Section } from './Section';

export function FooterSection({ fields, className }: FooterSectionProps) {
  const {
    logo,
    tagline,
    columns = [],
    socialLinks = [],
    bottomLinks = [],
    newsletter = null,
    copyrightText,
    backgroundColor = 'bg-gray-900',
    textColor = 'text-gray-300',
    accentColor = 'text-blue-400',
    showDivider = true,
    layout = 'standard',
  } = fields;

  const renderNewsletter = () => {
    if (!newsletter) return null;

    return (
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-4 ${accentColor}`}>
          {newsletter.headline}
        </h3>
        <p className="mb-4">{newsletter.description}</p>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            // Handle newsletter subscription
            if (newsletter.onSubscribe) {
              newsletter.onSubscribe(new FormData(e.currentTarget).get('email') as string);
            }
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder={newsletter.placeholder || "Enter your email"}
            required
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            {newsletter.buttonText || "Subscribe"}
          </button>
        </form>
        {newsletter.disclaimer && (
          <p className="mt-2 text-sm text-gray-400">{newsletter.disclaimer}</p>
        )}
      </div>
    );
  };

  const renderSocialLinks = () => {
    if (!socialLinks.length) return null;

    return (
      <div className="flex gap-4 mb-8">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:${accentColor} transition-colors`}
            aria-label={link.platform}
          >
            {link.icon ? (
              <img
                src={link.icon.url}
                alt={link.platform}
                className="w-6 h-6"
                width={link.icon.width}
                height={link.icon.height}
              />
            ) : (
              <span className="text-2xl">{link.platform}</span>
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
        {columns.map((column, index) => (
          <div key={index}>
            {column.heading && (
              <h3 className={`text-lg font-semibold mb-4 ${accentColor}`}>
                {column.heading}
              </h3>
            )}
            {column.links && (
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className={`hover:${accentColor} transition-colors`}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {column.content && (
              <div className="prose prose-invert max-w-none">
                {column.content}
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
        {bottomLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`hover:${accentColor} transition-colors`}
          >
            {link.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <Section
      fields={fields}
      className={`${backgroundColor} ${textColor} ${className ?? ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          {logo && (
            <img
              src={logo.url}
              alt={logo.alt}
              className="h-12 mb-4"
              width={logo.width}
              height={logo.height}
            />
          )}
          {tagline && (
            <p className="text-lg max-w-2xl">{tagline}</p>
          )}
        </div>

        {layout === 'standard' && (
          <>
            {renderNewsletter()}
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
                  src={logo.url}
                  alt={logo.alt}
                  className="h-12 mb-4"
                  width={logo.width}
                  height={logo.height}
                />
              )}
              {tagline && (
                <p className="text-lg mb-6">{tagline}</p>
              )}
              {renderNewsletter()}
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
    </Section>
  );
} 