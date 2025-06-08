import { type TestimonialsSectionProps } from '@/types/sections';
import { Section } from './Section';

export function TestimonialsSection({ fields, className }: TestimonialsSectionProps) {
  const { 
    testimonials, 
    layout = 'grid', 
    columns = 3,
    showRatings = true,
    showCompany = true
  } = fields;

  console.log(testimonials,  'testimonials');

  const containerClass = layout === 'list' 
    ? 'space-y-8'
    : layout === 'carousel'
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto'
    : `grid grid-cols-1 md:grid-cols-${columns} gap-8`;

  return (
    <Section fields={fields} className={className}>
      <div className={containerClass}>
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {showRatings && testimonial.rating && (
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            
            <blockquote className="text-gray-700 mb-4">
              "{testimonial.quote}"
            </blockquote>
            
            <div className="flex items-center gap-4">
              {testimonial.authorImage && (
                <img
                  src={testimonial.authorImage.url}
                  alt={testimonial.authorImage.alt}
                  className="w-12 h-12 rounded-full object-cover"
                  width={testimonial.authorImage.width}
                  height={testimonial.authorImage.height}
                />
              )}
              <div>
                <p className="font-semibold">{testimonial.authorName}</p>
                {testimonial.authorTitle && (
                  <p className="text-sm text-gray-600">{testimonial.authorTitle}</p>
                )}
                {showCompany && testimonial.company && (
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
} 