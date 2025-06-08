import { type CTASectionProps } from '@/types/sections';
import { Section } from './Section';

export function CTASection({ fields, className }: CTASectionProps) {
  const {
    headline,
    description,
    buttons = [],
    backgroundImage,
    layout = 'centered',
    backgroundColor,
    textColor = 'text-white',
    overlayOpacity = 0.5,
    buttonAlignment = 'center',
  } = fields;

  const buttonVariants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-100 text-blue-600',
    outline: 'border-2 border-white hover:bg-white/10 text-white',
  };

  const containerClass = layout === 'split'
    ? 'grid md:grid-cols-2 gap-8 items-center'
    : 'max-w-3xl mx-auto text-center';

  const contentClass = layout === 'minimal'
    ? 'py-8'
    : 'py-16';

  const buttonContainerClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }[buttonAlignment];

  return (
    <Section 
      fields={fields}
      className={`relative ${contentClass} ${textColor} ${className ?? ''}`}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage.url})`,
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
          <h2 className="text-4xl font-bold mb-4">{headline}</h2>
          {description && (
            <p className="text-lg mb-8 opacity-90">{description}</p>
          )}
        </div>

        {layout === 'split' && (
          <div className="flex flex-col gap-4">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className={`px-8 py-3 rounded-lg font-semibold text-center transition-colors ${
                  buttonVariants[button.variant || 'primary']
                }`}
              >
                {button.icon && (
                  <img
                    src={button.icon.url}
                    alt={button.icon.alt}
                    className="w-5 h-5 inline-block mr-2"
                    width={button.icon.width}
                    height={button.icon.height}
                  />
                )}
                {button.text}
              </a>
            ))}
          </div>
        )}

        {layout !== 'split' && buttons.length > 0 && (
          <div className={`flex flex-col sm:flex-row gap-4 ${buttonContainerClass}`}>
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className={`px-8 py-3 rounded-lg font-semibold text-center transition-colors ${
                  buttonVariants[button.variant || 'primary']
                }`}
              >
                {button.icon && (
                  <img
                    src={button.icon.url}
                    alt={button.icon.alt}
                    className="w-5 h-5 inline-block mr-2"
                    width={button.icon.width}
                    height={button.icon.height}
                  />
                )}
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
} 