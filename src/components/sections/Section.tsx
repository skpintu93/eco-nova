import { type ReactNode } from 'react';
import { type SectionFields } from '@/lib/contentful';

interface SectionProps {
  fields: SectionFields;
  children: ReactNode;
  className?: string;
}

const getSpacingClasses = (size: string | undefined, type: 'padding' | 'margin') => {
  if (!size || size === 'none') return '';
  
  const classes = {
    padding: {
      small: 'py-8 px-4',
      medium: 'py-12 px-6',
      large: 'py-16 px-8'
    },
    margin: {
      small: 'my-4',
      medium: 'my-8',
      large: 'my-12'
    }
  };
  
  return classes[type][size as keyof typeof classes[typeof type]] || '';
};

export function Section({ 
  fields, 
  children, 
  className = ''
}: SectionProps) {
  const { backgroundColor, padding, margin } = fields;
  
  const paddingClasses = getSpacingClasses(padding, 'padding');
  const marginClasses = getSpacingClasses(margin, 'margin');
  
  return (
    <section 
      className={`
        ${paddingClasses}
        ${marginClasses}
        ${backgroundColor ? `bg-[${backgroundColor}]` : ''}
        ${className}
      `.trim()}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
} 