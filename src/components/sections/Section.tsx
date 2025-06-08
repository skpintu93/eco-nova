import { type ReactNode } from 'react';
import { type SectionFields } from '@/types/sections';

interface SectionProps {
  fields: SectionFields;
  children: ReactNode;
}

const getSpacingClasses = (size: string | undefined, type: 'padding' | 'margin') => {
  if (!size || size === 'none') return '';
  
  const classes = {
    padding: {
      none: '',
      small: 'py-8 px-4',
      medium: 'py-12 px-6',
      large: 'py-16 px-8'
    },
    margin: {
      none: '',
      small: 'my-4',
      medium: 'my-8',
      large: 'my-12'
    }
  };
  
  return classes[type][size as keyof typeof classes[typeof type]] || '';
};

export function Section({ 
  fields, 
  children
}: SectionProps) {
  const { backgroundColor, padding, margin } = fields;

  const paddingClasses = getSpacingClasses(padding, 'padding');
  const marginClasses = getSpacingClasses(margin, 'margin');
  
  return (
    <section 
      className={`
        relative
        ${paddingClasses}
        ${marginClasses}
        ${backgroundColor ? `bg-[${backgroundColor}]` : ''}
      `.trim()}
    >
        {children}
    </section>
  );
} 