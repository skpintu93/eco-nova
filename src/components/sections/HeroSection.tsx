import { ContentfulEntry, HeroSectionFields, SectionFields } from '@/types/sections';
import { getEntryById } from '@/lib/contentful';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type MediaType = 'image' | 'video';

export async function HeroSection({ section }: { section: ContentfulEntry<SectionFields> }) {

  // get the entries by sys.id
  const entry = await getEntryById<HeroSectionFields>(section.fields.content.sys.id, section.sys.locale);
  const fields = entry.fields;

  // Map incoming data structure to expected props
  const mappedFields = {
    title: fields.title,
    subtitle: fields.subtitle,
    ctaButton: fields.ctaButton,
    backgroundMedia: fields.backgroundMedia,
    alignment: fields.alignment,
    overlayOpacity: fields.overlayOpacity,
    backgroundColor: fields.backgroundColor ? `bg-[${fields.backgroundColor}]` : 'bg-black',
  };

  const { 
    title, 
    subtitle, 
    ctaButton, 
    backgroundMedia, 
    alignment,
    backgroundColor,
  } = mappedFields;

  const buttonVariants: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
    secondary: 'bg-white hover:bg-gray-100 text-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
    outline: 'border-2 border-white hover:bg-white/10 text-white backdrop-blur-sm transition-colors duration-200'
  };

  const renderBackground = () => {
    if (!backgroundMedia) return null;

    // Get the full URL for the asset
    const assetUrl = backgroundMedia.fields.file.url.startsWith('//') 
      ? `https:${backgroundMedia.fields.file.url}`
      : backgroundMedia.fields.file.url;

    const mediaType: MediaType = backgroundMedia.fields.file.contentType.startsWith('video/') ? 'video' : 'image';
    
    if (mediaType === 'video') {
      return (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute min-w-full min-h-full object-cover"
            style={{
              transform: 'scale(1.1)', // Prevents white edges during parallax
            }}
          >
            <source src={assetUrl} type={backgroundMedia.fields.file.contentType} />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlay */}
          <div 
            className={`absolute inset-0 ${backgroundColor} opacity-75`}
            style={{
              background: `linear-gradient(to bottom, ${backgroundColor} 0%, transparent 100%)`
            }}
          />
        </div>
      );
    }

    return (
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${assetUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: 'scale(1.1)', // Prevents white edges during parallax
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className={`absolute inset-0 ${backgroundColor} opacity-75`}
          style={{
            background: `linear-gradient(to bottom, ${backgroundColor} 0%, transparent 100%)`
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative h-[90vh]">
      {/* Background Media (Image or Video) */}
      {renderBackground()}
      
      {/* Content Container */}
      <div 
        className={`relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center ${
          alignment === 'left' 
            ? 'md:grid md:grid-cols-2 md:gap-12 md:items-center' 
            : 'justify-center'
        }`}
      >
        {/* Text Content */}
        <div className={`${alignment === 'left' ? 'md:text-left' : 'text-center'} space-y-6 w-full`}>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-90 leading-relaxed text-white">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mt-8 ${
              alignment === 'left' ? 'md:justify-start' : 'justify-center'
            }`}
          >
            {ctaButton && (() => {
              const button = ctaButton.fields;
              if (!button) return null;
              return (
                <a
                  href={button.link}
                  className={`px-8 py-4 rounded-lg font-semibold text-center ${
                    buttonVariants[button.variant as ButtonVariant]
                  }`}
                >
                  {button.text}
                </a>
              );
            })()}
          </div>
        </div>

        {/* Optional Right Column Content for Split Layout */}
        {alignment === 'left' && (
          <div className="hidden md:block relative">
            {/* Add any additional content for split layout here */}
          </div>
        )}
      </div>

      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6 opacity-50 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
} 