import { ContentfulEntry, TestimonialsSectionFields, SectionFields, TestimonialFields } from '@/types/sections';
import { StarIcon } from '@heroicons/react/24/solid';
import { getEntryById } from '@/lib/contentful';
import Image from 'next/image';

export async function TestimonialsSection({ section }: { section: ContentfulEntry<SectionFields> }) {
  const entry = await getEntryById<TestimonialsSectionFields>(section.fields.content.sys.id, section.sys.locale);
  const fields = entry.fields;

  const { title, subtitle, testimonials, layout = 'grid' } = fields;

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
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
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 h-full flex flex-col">
        {renderRating(rating)}
        <blockquote className="flex-1">
          <p className="text-sm sm:text-base text-gray-600 italic mb-4">&quot;{quote}&quot;</p>
        </blockquote>
        <div className="flex items-center gap-3 sm:gap-4 mt-4">
          {authorImage && (
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src={`https:${authorImage.fields.file.url}`}
                alt={authorName}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 40px, 48px"
                priority={false}
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{authorName}</p>
            {authorTitle && <p className="text-xs sm:text-sm text-gray-600 truncate">{authorTitle}</p>}
            {company && <p className="text-xs sm:text-sm text-gray-500 truncate">{company}</p>}
          </div>
        </div>
      </div>
    );
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6';
      case 'list':
        return 'space-y-4 sm:space-y-6 max-w-3xl mx-auto';
      case 'carousel':
        return 'flex overflow-x-auto gap-4 sm:gap-6 pb-4 sm:pb-6 snap-x snap-mandatory scrollbar-hide';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      {(title || subtitle) && (
        <div className="text-center mb-8 sm:mb-12">
          {title && (
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">{subtitle}</p>
          )}
        </div>
      )}

      <div className={getLayoutClasses()}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.sys.id}
            className={layout === 'carousel' ? 'snap-start flex-none w-[85%] sm:w-[45%] lg:w-[30%]' : ''}
          >
            {renderTestimonial(testimonial)}
          </div>
        ))}
      </div>
    </div>
  );
} 