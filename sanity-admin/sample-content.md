# Sample Content for Your Sanity Studio

## Home Page Document
Create a new "Home Page" document with the following sample content:

### Basic Information
- **Page Title**: "Welcome to Sanity Admin"
- **Hero Section**:
  - **Hero Heading**: "Transform Your Business with Sanity Admin"
  - **Hero Subheading**: "We help companies innovate and grow with cutting-edge solutions and expert guidance."
  - **Hero Image**: Upload a professional business image
  - **CTA Text**: "Get Started Today"
  - **CTA Link**: "/contact"

### Features Section
Add 3-4 features:
1. **Feature 1**:
   - Title: "Innovation First"
   - Description: "We stay ahead of the curve with the latest technologies and methodologies."
   - Icon: "🚀"

2. **Feature 2**:
   - Title: "Expert Team"
   - Description: "Our experienced professionals deliver exceptional results on every project."
   - Icon: "👥"

3. **Feature 3**:
   - Title: "Results Driven"
   - Description: "We focus on measurable outcomes that drive your business forward."
   - Icon: "📈"

### Main Content
Add some rich text content about your company, mission, and values.

### SEO
- **Meta Title**: "Sanity Admin - Transform Your Business with Innovation"
- **Meta Description**: "Sanity Admin helps companies innovate and grow with cutting-edge solutions and expert guidance. Get started today!"

## Regular Page Document
Create a new "Page" document for additional content:

### Sample About Page
- **Title**: "About Us"
- **Slug**: "about-us"
- **Excerpt**: "Learn about Sanity Admin's mission, values, and the team behind our success."
- **Content**: Rich text content about your company
- **Published At**: Set to current date/time
- **SEO**: Custom meta information for the about page

## Getting Started
1. Run `npm run dev` in the Sanity Admin directory
2. Open your Sanity Studio at the provided URL
3. Create your first documents using the schemas above
4. Use the Vision tool to query your content with GROQ
5. Start building your frontend to consume this content!

## Useful GROQ Queries

### Get Home Page
```groq
*[_type == "homePage"][0] {
  title,
  hero,
  features,
  content,
  seo
}
```

### Get All Pages
```groq
*[_type == "page"] {
  title,
  slug,
  excerpt,
  publishedAt
}
```

### Get Single Page by Slug
```groq
*[_type == "page" && slug.current == $slug][0] {
  title,
  content,
  seo
}
```
