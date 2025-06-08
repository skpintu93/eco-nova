import { ContentfulEntry, TestimonialsSectionFields, SectionFields, TestimonialFields } from '@/types/sections';
import { StarIcon } from '@heroicons/react/24/solid';
import { getEntryById } from '@/lib/contentful';

export async function TestimonialsSection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<TestimonialsSectionFields>(section.fields.content.sys.id);
  const fields = entry.fields;

  const { title, subtitle, testimonials, layout = 'grid' } = fields;

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < (rating || 0) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderTestimonial = (testimonial: ContentfulEntry<TestimonialFields>) => {
    const { quote, authorName, authorTitle, rating, company, authorImage } = testimonial.fields;
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
        {renderRating(rating)}
        <blockquote className="flex-1">
          <p className="text-gray-600 italic mb-4">"{quote}"</p>
        </blockquote>
        <div className="flex items-center gap-4 mt-4">
          {authorImage && (
            <img
              src={`https:${authorImage.fields.file.url}`}
              alt={authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{authorName}</p>
            {authorTitle && <p className="text-sm text-gray-600">{authorTitle}</p>}
            {company && <p className="text-sm text-gray-500">{company}</p>}
          </div>
        </div>
      </div>
    );
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'space-y-6 max-w-3xl mx-auto';
      case 'carousel':
        return 'flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}

      <div className={getLayoutClasses()}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.sys.id}
            className={layout === 'carousel' ? 'snap-start flex-none w-full md:w-1/2 lg:w-1/3' : ''}
          >
            {renderTestimonial(testimonial)}
          </div>
        ))}
      </div>
    </div>
  );
} 