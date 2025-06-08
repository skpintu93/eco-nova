import { type ReactNode } from 'react';
import { type SectionFields } from '@/lib/contentful';

interface SectionProps {
  fields: SectionFields;
  children: ReactNode;
  className?: string;
}

export function Section({ fields, children, className = '' }: SectionProps) {
  const { backgroundColor } = fields;
  
  return (
    <section 
      className={`py-16 px-4 ${backgroundColor ? `bg-${backgroundColor}` : ''} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {fields.title && (
          <h2 className="text-3xl font-bold text-center mb-4">{fields.title}</h2>
        )}
        {fields.subtitle && (
          <p className="text-lg text-center text-gray-600 mb-8">{fields.subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
} 