import pkg from 'contentful-management';
const { createClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const {
  CONTENTFUL_MANAGEMENT_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT = 'master',
} = process.env;

if (!CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_SPACE_ID) {
  throw new Error('Required environment variables are missing');
}

// Now we can safely use these variables as they are checked
const managementToken: string = CONTENTFUL_MANAGEMENT_TOKEN;
const spaceId: string = CONTENTFUL_SPACE_ID;
const envId: string = CONTENTFUL_ENVIRONMENT;

const client = createClient({
  accessToken: managementToken,
});

interface ButtonData {
  text: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

interface CtaBlockData {
  title: string;
  subtitle?: string;
  primaryButton: string; // Reference to button entry
  secondaryButton?: string; // Reference to button entry
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: string; // Reference to asset
}

interface FeatureItemData {
  title: string;
  description?: string;
  icon?: string; // Reference to asset
  link?: string;
}

interface ProductSpecData {
  name: string;
  value: string;
  unit?: string;
  icon?: string; // Reference to asset
  description?: string;
}

interface TestimonialData {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorImage?: string; // Reference to asset
  rating?: number;
  company?: string;
}

interface SectionData {
  type: 'hero' | 'features' | 'testimonials' | 'productSpecs' | 'cta' | 'footer';
  content: string; // Reference to section content entry
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
}

interface LandingPageData {
  title: string;
  slug: string;
  metaDescription?: string;
  metaImage?: string; // Reference to asset
  sections: string[]; // References to section entries
  status: 'draft' | 'published';
}

interface LocalizedData {
  [locale: string]: {
    [fieldId: string]: any;
  };
}

// Define translations for all content
const translations = {
  buttons: {
    primary: {
      text: {
        'en-US': 'Get Started',
        'es': 'Comenzar'
      },
      link: {
        'en-US': '/signup',
        'es': '/registro'
      },
      variant: {
        'en-US': 'primary'
      },
      size: {
        'en-US': 'large'
      }
    },
    secondary: {
      text: {
        'en-US': 'Learn More',
        'es': 'Saber Más'
      },
      link: {
        'en-US': '/about',
        'es': '/acerca'
      },
      variant: {
        'en-US': 'secondary'
      },
      size: {
        'en-US': 'medium'
      }
    },
    outline: {
      text: {
        'en-US': 'Contact Us',
        'es': 'Contáctanos'
      },
      link: {
        'en-US': '/contact',
        'es': '/contacto'
      },
      variant: {
        'en-US': 'outline'
      },
      size: {
        'en-US': 'medium'
      }
    }
  },
  ctaBlocks: {
    main: {
      title: {
        'en-US': 'Ready to Transform Your Experience?',
        'es': '¿Listo para Transformar tu Experiencia?'
      },
      subtitle: {
        'en-US': 'Join thousands of satisfied customers who have already made the switch.',
        'es': 'Únete a miles de clientes satisfechos que ya han dado el cambio.'
      },
      alignment: {
        'en-US': 'center'
      }
    },
    secondary: {
      title: {
        'en-US': 'Need More Information?',
        'es': '¿Necesitas Más Información?'
      },
      subtitle: {
        'en-US': 'Our team is here to help you make the right decision.',
        'es': 'Nuestro equipo está aquí para ayudarte a tomar la decisión correcta.'
      },
      alignment: {
        'en-US': 'left'
      }
    }
  },
  heroSection: {
    main: {
      title: {
        'en-US': 'Welcome to the Future of Business',
        'es': 'Bienvenido al Futuro de los Negocios'
      },
      subtitle: {
        'en-US': 'Transform your operations with our innovative platform',
        'es': 'Transforma tus operaciones con nuestra plataforma innovadora'
      },
      alignment: {
        'en-US': 'center'
      },
      backgroundColor: {
        'en-US': '#ffffff'
      }
    }
  },
  featuresSection: {
    main: {
      title: {
        'en-US': 'Why Choose Us',
        'es': 'Por Qué Elegirnos'
      },
      subtitle: {
        'en-US': 'Discover the features that set us apart',
        'es': 'Descubre las características que nos distinguen'
      },
      layout: {
        'en-US': 'grid'
      },
      columns: {
        'en-US': 3
      },
      backgroundColor: {
        'en-US': '#f8f9fa'
      },
      features: [
        {
          title: {
            'en-US': 'Easy Integration',
            'es': 'Fácil Integración'
          },
          description: {
            'en-US': 'Seamlessly connect with your existing tools and workflows',
            'es': 'Conéctate perfectamente con tus herramientas y flujos de trabajo existentes'
          },
          link: {
            'en-US': '/features/integration',
            'es': '/caracteristicas/integracion'
          }
        },
        {
          title: {
            'en-US': 'Advanced Analytics',
            'es': 'Análisis Avanzado'
          },
          description: {
            'en-US': 'Get deep insights into your business performance',
            'es': 'Obtén información profunda sobre el rendimiento de tu negocio'
          },
          link: {
            'en-US': '/features/analytics',
            'es': '/caracteristicas/analisis'
          }
        },
        {
          title: {
            'en-US': '24/7 Support',
            'es': 'Soporte 24/7'
          },
          description: {
            'en-US': 'Our dedicated team is always here to help you',
            'es': 'Nuestro equipo dedicado siempre está aquí para ayudarte'
          },
          link: {
            'en-US': '/features/support',
            'es': '/caracteristicas/soporte'
          }
        }
      ]
    }
  },
  testimonialsSection: {
    main: {
      title: {
        'en-US': 'What Our Customers Say',
        'es': 'Lo Que Dicen Nuestros Clientes'
      },
      subtitle: {
        'en-US': 'Join thousands of satisfied businesses',
        'es': 'Únete a miles de negocios satisfechos'
      },
      layout: {
        'en-US': 'carousel'
      },
      backgroundColor: {
        'en-US': '#ffffff'
      }
    }
  },
  testimonial: {
    main: [
      {
        quote: {
          'en-US': 'This platform has transformed how we do business. The results are incredible!',
          'es': 'Esta plataforma ha transformado nuestra forma de hacer negocios. ¡Los resultados son increíbles!'
        },
        authorName: {
          'en-US': 'Sarah Johnson',
          'es': 'Sarah Johnson'
        },
        authorTitle: {
          'en-US': 'CEO, TechCorp',
          'es': 'CEO, TechCorp'
        },
        company: {
          'en-US': 'TechCorp',
          'es': 'TechCorp'
        },
        rating: {
          'en-US': 5
        }
      },
      {
        quote: {
          'en-US': 'The support team is amazing. They helped us every step of the way.',
          'es': 'El equipo de soporte es increíble. Nos ayudaron en cada paso del camino.'
        },
        authorName: {
          'en-US': 'Michael Chen',
          'es': 'Michael Chen'
        },
        authorTitle: {
          'en-US': 'CTO, Innovate Inc',
          'es': 'CTO, Innovate Inc'
        },
        company: {
          'en-US': 'Innovate Inc',
          'es': 'Innovate Inc'
        },
        rating: {
          'en-US': 5
        }
      }
    ]
  },
  productSpecsSection: {
    main: {
      title: {
        'en-US': 'Product Specifications',
        'es': 'Especificaciones del Producto'
      },
      subtitle: {
        'en-US': 'Technical details that matter',
        'es': 'Detalles técnicos que importan'
      },
      layout: {
        'en-US': 'grid'
      },
      backgroundColor: {
        'en-US': '#f8f9fa'
      }
    }
  },
  productSpec: {
    main: [
      {
        name: {
          'en-US': 'Performance',
          'es': 'Rendimiento'
        },
        value: {
          'en-US': '99.9%',
          'es': '99.9%'
        },
        description: {
          'en-US': 'Uptime guarantee',
          'es': 'Garantía de tiempo de actividad'
        }
      },
      {
        name: {
          'en-US': 'Security',
          'es': 'Seguridad'
        },
        value: {
          'en-US': 'Enterprise',
          'es': 'Empresarial'
        },
        description: {
          'en-US': 'Bank-level encryption',
          'es': 'Cifrado de nivel bancario'
        }
      },
      {
        name: {
          'en-US': 'Support',
          'es': 'Soporte'
        },
        value: {
          'en-US': '24/7',
          'es': '24/7'
        },
        description: {
          'en-US': 'Round-the-clock assistance',
          'es': 'Asistencia las 24 horas'
        }
      }
    ]
  },
  footerSection: {
    main: {
      title: { 'en-US': 'Footer', 'es': 'Pie de Página' },
      tagline: { 'en-US': '© 2023 Eco Nova. All rights reserved.', 'es': '© 2023 Eco Nova. Todos los derechos reservados.' },
      copyrightText: { 'en-US': '© 2023 Eco Nova', 'es': '© 2023 Eco Nova' },
      layout: { 'en-US': 'standard' },
      backgroundColor: { 'en-US': '#f8f9fa' },
      showDivider: { 'en-US': true }
    }
  }
};

async function createEntry(contentTypeId: string, data: any) {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);

    // Format the fields properly for Contentful
    const formattedFields: { [key: string]: any } = {};
    
    // Process each field
    Object.entries(data).forEach(([fieldId, fieldData]) => {
      if (fieldData === null || fieldData === undefined) {
        return; // Skip null or undefined values
      }

      // Handle localized fields (those that have locale keys)
      if (typeof fieldData === 'object' && ('en-US' in fieldData || 'es' in fieldData)) {
        formattedFields[fieldId] = fieldData;
      }
      // Handle link fields
      else if (typeof fieldData === 'object' && 'sys' in fieldData) {
        formattedFields[fieldId] = fieldData;
      }
      // Handle array of links
      else if (Array.isArray(fieldData) && fieldData.every(item => item && typeof item === 'object' && 'sys' in item)) {
        formattedFields[fieldId] = fieldData;
      }
      // Handle simple values (non-localized fields)
      else {
        formattedFields[fieldId] = fieldData;
      }
    });

    const entry = await env.createEntry(contentTypeId, { fields: formattedFields });
    console.log(`Created ${contentTypeId} entry: ${entry.sys.id}`);
    return entry.sys.id;
  } catch (error) {
    console.error(`Error creating ${contentTypeId} entry:`, error);
    throw error;
  }
}

async function createLandingPage() {
  try {
    const space = await client.getSpace(spaceId);
    const env = await space.getEnvironment(envId);

    // 1. Create Buttons
    const buttons = {
      primary: await createEntry('button', translations.buttons.primary),
      secondary: await createEntry('button', translations.buttons.secondary),
      outline: await createEntry('button', translations.buttons.outline),
    };

    // 2. Create CTA Blocks
    const ctaBlocks = {
      main: await createEntry('ctaBlock', {
        ...translations.ctaBlocks.main,
        primaryButton: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: buttons.primary
            }
          }
        },
        secondaryButton: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: buttons.secondary
            }
          }
        }
      }),
      secondary: await createEntry('ctaBlock', {
        ...translations.ctaBlocks.secondary,
        primaryButton: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: buttons.outline
            }
          }
        }
      })
    };

    // 3. Create Hero Section
    const heroSection = await createEntry('heroSection', {
      ...translations.heroSection.main,
      ctaButton: {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: buttons.primary
          }
        }
      }
    });

    // 4. Create Features
    const features = await Promise.all(
      translations.featuresSection.main.features.map(feature =>
        createEntry('featureItem', feature)
      )
    );

    // Create Features Section with proper array structure
    const featuresSection = await createEntry('featuresSection', {
      title: translations.featuresSection.main.title,
      subtitle: translations.featuresSection.main.subtitle,
      layout: translations.featuresSection.main.layout,
      columns: translations.featuresSection.main.columns,
      backgroundColor: translations.featuresSection.main.backgroundColor,
      features: {
        'en-US': features.map(id => ({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id
          }
        }))
      }
    });

    // 5. Create Testimonials
    const testimonials = await Promise.all(
      translations.testimonial.main.map(testimonial =>
        createEntry('testimonial', testimonial)
      )
    );

    const testimonialsSection = await createEntry('testimonialsSection', {
      ...translations.testimonialsSection.main,
      testimonials: {
        'en-US': { sys: { type: 'Link', linkType: 'Entry', id: testimonials[0] } }
      }
    });

    // 6. Create Product Specs
    const specs = await Promise.all(
      translations.productSpec.main.map(spec =>
        createEntry('productSpec', spec)
      )
    );

    const productSpecsSection = await createEntry('productSpecsSection', {
      title: translations.productSpecsSection.main.title,
      subtitle: translations.productSpecsSection.main.subtitle,
      layout: translations.productSpecsSection.main.layout,
      backgroundColor: translations.productSpecsSection.main.backgroundColor,
      specs: {
        'en-US': specs.map(id => ({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id
          }
        }))
      }
    });

    // 7. Create CTA Section
    const ctaSection = await createEntry('ctaSection', {
      title: {
        'en-US': 'Start Your Journey Today',
        'es': 'Comienza tu Viaje Hoy'
      },
      subtitle: {
        'en-US': 'Join the growing community of successful businesses using our platform.',
        'es': 'Únete a la creciente comunidad de negocios exitosos que usan nuestra plataforma.'
      },
      ctaBlock: {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: ctaBlocks.main
          }
        }
      },
      backgroundColor: {
        'en-US': '#f8f9fa'
      }
    });

    // 8. Create Footer Section
    const footerSection = await createEntry('footerSection', translations.footerSection.main);

    // 9. Create Sections
    const sections = await Promise.all([
      createEntry('section', {
        type: {
          'en-US': 'hero'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: heroSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#ffffff'
        }
      }),
      createEntry('section', {
        type: {
          'en-US': 'features'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: featuresSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#f8f9fa'
        }
      }),
      createEntry('section', {
        type: {
          'en-US': 'testimonials'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: testimonialsSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#ffffff'
        }
      }),
      createEntry('section', {
        type: {
          'en-US': 'productSpecs'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: productSpecsSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#f8f9fa'
        }
      }),
      createEntry('section', {
        type: {
          'en-US': 'cta'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: ctaSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#ffffff'
        }
      }),
      createEntry('section', {
        type: {
          'en-US': 'footer'
        },
        content: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: footerSection
            }
          }
        },
        padding: {
          'en-US': 'large'
        },
        backgroundColor: {
          'en-US': '#f8f9fa'
        }
      })
    ]);

    // 10. Create Landing Page
    const landingPage = await createEntry('landingPage', {
      title: {
        'en-US': 'Welcome to Our Platform',
        'es': 'Bienvenido a Nuestra Plataforma'
      },
      slug: {
        'en-US': 'welcome',
        'es': 'bienvenida'
      },
      metaDescription: {
        'en-US': 'Transform your business with our innovative platform. Join thousands of satisfied customers today.',
        'es': 'Transforma tu negocio con nuestra plataforma innovadora. Únete a miles de clientes satisfechos hoy.'
      },
      sections: {
        'en-US': sections.map(id => ({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id
          }
        }))
      },
      status: {
        'en-US': 'published'
      }
    });

    console.log('Successfully created landing page with ID:', landingPage);
    return landingPage;
  } catch (error) {
    console.error('Error creating landing pages:', error);
    throw error;
  }
}

// Run the script
createLandingPage().catch(console.error); 