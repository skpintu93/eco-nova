# Eco Nova

A modern, content-driven website built with Next.js and Contentful CMS.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Contentful account

### Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_ENVIRONMENT=master
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/eco-nova.git
cd eco-nova
```

2. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Architecture

### Frontend Stack

- **Framework**: Next.js 15.3.3 with React 19
- **Styling**: Tailwind CSS
- **Icons**: @heroicons/react
- **API Client**: GraphQL Request

### Content Model

The project uses a modular content model in Contentful with the following main content types:

#### Core Content Types

1. **CTA Section**
   - Title (localized)
   - Subtitle (localized)
   - CTA Button (linked to Button content type)
   - Background Image
   - Background Color
   - Overlay Opacity

2. **Product Spec**
   - Title (localized)
   - Description (localized)
   - Specifications (array)
   - Images (array)

3. **Footer Section**
   - Title (localized)
   - Logo
   - Tagline (localized)
   - Columns (array)
   - Social Links (array)
   - Bottom Links (array)
   - Copyright Text (localized)
   - Layout

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export-content-types` - Export content types from Contentful
- `npm run publish-entries` - Publish draft entries
- `npm run add-landing-page` - Create initial landing page
- `npm run setup-localization` - Configure content localization
- `npm run draft-entries` - Create draft entries
- `npm run enable-localization` - Enable localization for content types
- `npm run setup-content-types` - Set up content types in Contentful
- `npm run create-content-types` - Create content types in Contentful

## 🔧 Contentful Setup

1. Create a new space in Contentful
2. Generate API keys:
   - Content Delivery API token
   - Content Management API token
3. Run the setup scripts in order:
   ```bash
   npm run setup-content-types
   npm run create-content-types
   npm run enable-localization
   npm run setup-localization
   npm run add-landing-page
   ```

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
