import { type HeroSectionProps } from '@/types/sections';
import { Section } from './Section';

export function HeroSection({ fields, className }: HeroSectionProps) {
  const { 
    headline, 
    subheadline, 
    ctaPrimary, 
    ctaSecondary, 
    backgroundImage, 
    layout = 'centered',
    backgroundColor = 'bg-black',
    textColor = 'text-white'
  } = fields;

  const buttonVariants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
    secondary: 'bg-white hover:bg-gray-100 text-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
    outline: 'border-2 border-white hover:bg-white/10 text-white backdrop-blur-sm transition-colors duration-200'
  };

  return (
    <Section 
      fields={fields}
      className={`relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden ${textColor} ${className ?? ''}`}
    >
      {/* Background Image with Parallax Effect */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage.url})`,
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
      )}
      
      {/* Content Container */}
      <div 
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
          layout === 'split' 
            ? 'md:grid md:grid-cols-2 md:gap-12 md:items-center' 
            : 'text-center max-w-4xl'
        }`}
      >
        {/* Text Content */}
        <div className={`${layout === 'split' ? 'md:text-left' : 'text-center'} space-y-6`}>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {headline}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mt-8 ${
              layout === 'split' ? 'md:justify-start' : 'justify-center'
            }`}
          >
            {ctaPrimary && (
              <a
                href={ctaPrimary.link}
                className={`px-8 py-4 rounded-lg font-semibold text-center ${
                  buttonVariants[ctaPrimary.variant || 'primary']
                }`}
              >
                {ctaPrimary.text}
              </a>
            )}
            {ctaSecondary && (
              <a
                href={ctaSecondary.link}
                className={`px-8 py-4 rounded-lg font-semibold text-center ${
                  buttonVariants[ctaSecondary.variant || 'outline']
                }`}
              >
                {ctaSecondary.text}
              </a>
            )}
          </div>
        </div>

        {/* Optional Right Column Content for Split Layout */}
        {layout === 'split' && (
          <div className="hidden md:block relative">
            {/* Add any additional content for split layout here */}
          </div>
        )}
      </div>

      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg 
          className="w-6 h-6 opacity-50" 
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
    </Section>
  );
} 