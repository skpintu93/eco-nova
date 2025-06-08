# Eco Nova

A modern, content-driven website built with Next.js and Contentful CMS.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
  ```bash
  # Check Node.js version
  node --version
  
  # If you need to install or update Node.js, visit:
  # https://nodejs.org/
  ```
- npm (comes with Node.js) or yarn
  ```bash
  # Check npm version
  npm --version
  
  # Or if using yarn
  yarn --version
  ```
- Git
  ```bash
  # Check Git version
  git --version
  ```

### Local Development Setup

1. **Clone the Repository**
   ```bash
   # Clone the repository
   git clone https://github.com/your-username/eco-nova.git
   
   # Navigate to project directory
   cd eco-nova
   ```

2. **Environment Variables Setup**

   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Contentful API Keys (Required)
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
   CONTENTFUL_ENVIRONMENT=master
   
   # Optional: Development-specific variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NODE_ENV=development
   ```

   > ⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

3. **Install Dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

   This will install all required dependencies:
   - **Core Dependencies**:
     - `next`: 15.3.3 (React framework)
     - `react`: ^19.0.0
     - `react-dom`: ^19.0.0
     - `contentful`: ^11.7.0 (Contentful SDK)
     - `@heroicons/react`: ^2.2.0 (UI icons)
   
   - **Development Dependencies**:
     - `typescript`: ^5.8.3
     - `tailwindcss`: ^4
     - `eslint`: ^9
     - And other development tools

4. **Start Development Server**
   ```bash
   # Start the development server with Turbopack
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

   > 💡 **Note**: The project uses Turbopack for faster development builds. If you encounter any issues, you can modify the `dev` script in `package.json` to use the standard Next.js development server by removing the `--turbopack` flag.

### Troubleshooting

1. **Node.js Version Issues**
   ```bash
   # If you see version-related errors, ensure you're using Node.js v18 or higher
   node --version
   
   # Consider using nvm to manage Node.js versions
   nvm install 18
   nvm use 18
   ```

2. **Dependency Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Contentful Connection Issues**
   - Verify your API keys in `.env.local`
   - Ensure your Contentful space is properly set up
   - Check your network connection
   - Verify the Contentful space ID and environment

4. **Development Server Issues**
   - Check if port 3000 is available
   - Try running without Turbopack (modify `dev` script)
   - Clear Next.js cache:
     ```bash
     rm -rf .next
     npm run dev
     ```

## 🔧 Contentful Setup

### 1. Create a New Space

1. Log in to your Contentful account
2. Click "Add space" and select "Create a space"
3. Choose "Create an empty space"
4. Name your space (e.g., "Eco Nova")
5. Select your organization
6. Click "Create space"

### 2. Generate API Keys

1. In your space, go to Settings > API keys
2. Create a new API key:
   - Click "Add API key"
   - Name it (e.g., "Eco Nova Development")
   - Copy the "Space ID" and "Content Delivery API - access token"
3. Create a Management Token:
   - Go to Settings > API keys > Content Management Tokens
   - Click "Generate personal token"
   - Name it (e.g., "Eco Nova Management")
   - Copy the generated token

### 3. Content Model Structure

The project uses a modular content model with the following main content types:

#### 1. CTA Section (`ctaSection`)
- **Title** (Symbol, required, localized)
- **Subtitle** (Text, optional, localized)
- **CTA Button** (Link to Button content type)
- **Background Image** (Link to Asset)
- **Background Color** (Symbol)
- **Overlay Opacity** (Number, 0-1)

#### 2. Product Spec (`productSpec`)
- **Title** (Symbol, required, localized)
- **Description** (Text, optional, localized)
- **Specifications** (Array)
- **Images** (Array)

#### 3. Footer Section (`footerSection`)
- **Title** (Symbol, required, localized)
- **Logo** (Link to Asset)
- **Tagline** (Text, optional, localized)
- **Columns** (Array of Footer Column entries)
- **Social Links** (Array)
- **Bottom Links** (Array)
- **Copyright Text** (Symbol, localized)
- **Layout** (Symbol, enum: "standard", "minimal", "expanded")
- **Background Color** (Symbol)
- **Accent Color** (Symbol)
- **Show Divider** (Boolean, default: true)

#### 4. Footer Column (`footerColumn`)
- **Heading** (Symbol, required)
- **Links** (Array of links)

#### 5. Button (`button`)
- **Text** (Symbol, required, localized)
- **Link** (Symbol, required)
- **Style** (Symbol, enum: "primary", "secondary", "text")
- **Size** (Symbol, enum: "sm", "md", "lg")
- **Icon** (Link to Asset, optional)

### 4. Enable Localization

1. Go to Settings > Locales
2. Add your default locale (e.g., "English (United States)")
3. Add additional locales as needed
4. Set the default locale

## 📄 Contentful Setup

### 1. Create a New Space

1. Log in to your Contentful account
2. Click "Add space" and select "Create a space"
3. Choose "Create an empty space"
4. Name your space (e.g., "Eco Nova")
5. Select your organization
6. Click "Create space"

### 2. Generate API Keys

1. In your space, go to Settings > API keys
2. Create a new API key:
   - Click "Add API key"
   - Name it (e.g., "Eco Nova Development")
   - Copy the "Space ID" and "Content Delivery API - access token"
3. Create a Management Token:
   - Go to Settings > API keys > Content Management Tokens
   - Click "Generate personal token"
   - Name it (e.g., "Eco Nova Management")
   - Copy the generated token

### 3. Content Model Structure

The project uses a modular content model with the following main content types:

#### 1. CTA Section (`ctaSection`)
- **Title** (Symbol, required, localized)
- **Subtitle** (Text, optional, localized)
- **CTA Button** (Link to Button content type)
- **Background Image** (Link to Asset)
- **Background Color** (Symbol)
- **Overlay Opacity** (Number, 0-1)

#### 2. Product Spec (`productSpec`)
- **Title** (Symbol, required, localized)
- **Description** (Text, optional, localized)
- **Specifications** (Array)
- **Images** (Array)

#### 3. Footer Section (`footerSection`)
- **Title** (Symbol, required, localized)
- **Logo** (Link to Asset)
- **Tagline** (Text, optional, localized)
- **Columns** (Array of Footer Column entries)
- **Social Links** (Array)
- **Bottom Links** (Array)
- **Copyright Text** (Symbol, localized)
- **Layout** (Symbol, enum: "standard", "minimal", "expanded")
- **Background Color** (Symbol)
- **Accent Color** (Symbol)
- **Show Divider** (Boolean, default: true)

#### 4. Footer Column (`footerColumn`)
- **Heading** (Symbol, required)
- **Links** (Array of links)

#### 5. Button (`button`)
- **Text** (Symbol, required, localized)
- **Link** (Symbol, required)
- **Style** (Symbol, enum: "primary", "secondary", "text")
- **Size** (Symbol, enum: "sm", "md", "lg")
- **Icon** (Link to Asset, optional)

## 📝 Content Management

The project uses Contentful's Content Management API for content modeling and delivery. Content is structured in a modular way, allowing for flexible page composition and easy content updates.

### Localization

The project supports content localization. To enable localization for new content types:
1. Run `npm run enable-localization`
2. Configure the desired locales in Contentful
3. Run `npm run setup-localization` to set up localization rules

## 🛠️ Development

### Code Structure

- `/src` - Application source code
- `/contentful` - Contentful content type definitions
- `/scripts` - Utility scripts for Contentful setup and management
- `/public` - Static assets

### Best Practices

1. Always use TypeScript for type safety
2. Follow the established content model structure
3. Use the provided scripts for content management
4. Keep content types modular and reusable
5. Test content rendering across different screen sizes

## 📄 License

[Add your license information here]

### Content Model Design Principles

The content model is designed following headless CMS best practices, emphasizing modularity, reusability, and channel-agnostic content delivery. Here's a detailed breakdown of the design choices:

#### 1. Modular Content Architecture

The content model follows a component-based architecture where each content type represents a reusable building block:

- **Atomic Components**
  - `button`: A fundamental UI element that can be reused across different sections
  - `footerColumn`: A modular unit for footer organization
  - `ctaSection`: A self-contained call-to-action component

- **Composite Components**
  - `footerSection`: Composes multiple `footerColumn` entries
  - `productSpec`: Combines specifications and images in a structured format

This modular approach enables:
- Content reuse across different pages and sections
- Independent content updates
- Flexible page composition
- Easy maintenance and scaling

#### 2. Content Reusability

The model promotes content reuse through:

- **Shared Components**
  - Buttons are stored as separate entries and referenced where needed
  - Footer columns can be reused across different footer layouts
  - CTA sections can be repurposed for different marketing campaigns

- **Reference Fields**
  - Using `Link` type fields to reference other content types
  - Enabling content relationships without duplication
  - Example: `ctaButton` in `ctaSection` references the `button` content type

#### 3. Channel-Agnostic Design

The content model is designed to be presentation-layer independent:

- **Separation of Content and Presentation**
  - Content types focus on data structure, not presentation
  - Visual styling is handled through separate fields (e.g., `backgroundColor`, `layout`)
  - No hard-coded styling or layout information

- **Flexible Content Delivery**
  - Content can be consumed by any frontend framework
  - Supports multiple delivery channels (web, mobile, etc.)
  - Enables future channel expansion

#### 4. Localization Support

Built-in support for multi-language content:

- **Field-Level Localization**
  - Critical fields are marked as `localized: true`
  - Supports different languages for titles, descriptions, and CTAs
  - Enables market-specific content variations

- **Default Values**
  - Fallback content for non-localized fields
  - Example: `layout` in `footerSection` has a default value of "standard"

#### 5. Dynamic Landing Page Support

The model enables dynamic landing page creation through:

- **Flexible Section Composition**
  - CTA sections can be arranged in any order
  - Product specifications can be displayed in various layouts
  - Footer sections support multiple layout options

- **Content Variation**
  - Different background options (images, colors)
  - Customizable overlay opacity
  - Multiple layout options (e.g., footer layouts: standard, minimal, expanded)

#### 6. Scalability Considerations

The model is designed to scale with growing content needs:

- **Extensible Structure**
  - New content types can be added without affecting existing ones
  - Fields can be added to existing content types
  - Support for future content requirements

- **Performance Optimization**
  - Efficient content relationships
  - Optimized asset handling
  - Structured data for fast retrieval

#### 7. Content Relationships

The model uses a carefully designed relationship structure:

- **One-to-One Relationships**
  - CTA Section → Button
  - Button → Icon (optional)

- **One-to-Many Relationships**
  - Footer Section → Footer Columns
  - Footer Section → Social Links
  - Footer Section → Bottom Links

This relationship design:
- Maintains content integrity
- Enables efficient content updates
- Supports complex content structures
- Facilitates content reuse

#### 8. Validation and Constraints

Built-in validation ensures content quality:

- **Field Validation**
  - Required fields for critical content
  - Range validation for numeric values (e.g., `overlayOpacity`)
  - Enum validation for predefined options (e.g., `layout` types)

- **Asset Validation**
  - MIME type validation for images
  - Structured asset organization
  - Optimized media handling

### Frontend Integration

The content model is designed to work seamlessly with the frontend:

- **Type Safety**
  - TypeScript interfaces generated from content types
  - Runtime type checking
  - Improved developer experience

- **Component Mapping**
  - Direct mapping between content types and React components
  - Consistent component structure
  - Reusable UI components

- **Content Delivery**
  - Optimized content fetching
  - Caching strategies
  - Real-time content updates

### Frontend Architecture & Scalability

The frontend is built with a modular, component-based architecture that aligns with headless principles:

#### Component Architecture
- **Atomic Design Pattern**
  - Base components (Button, Card, Section)
  - Content-specific components (CTASection, ProductSpec)
  - Page-level components (LandingPage, ProductPage)
- **Component Mapping**
  - Direct mapping between Contentful content types and React components
  - Reusable components for common patterns
  - Type-safe props using generated TypeScript interfaces

#### Data Fetching & Rendering
- **Next.js App Router**
  - Server Components for static content
  - Client Components for interactive elements
  - Incremental Static Regeneration (ISR) for dynamic content
- **Content Delivery**
  - Optimized GraphQL queries for content fetching
  - Client-side caching for improved performance
  - Real-time content updates with webhooks

#### Scalability Features
- **Content Type Expansion**
  - New content types automatically map to components
  - Shared component library for consistent UI
  - Type generation for new content models
- **Multi-Channel Support**
  - Channel-agnostic component design
  - Responsive layouts for different devices
  - API-first approach for future channels
- **Performance Optimization**
  - Code splitting by route
  - Image optimization
  - Static page generation where possible
