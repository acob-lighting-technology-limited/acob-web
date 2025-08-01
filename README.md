# ACOB Lighting Company Website

This is the official website for ACOB Lighting, built with Next.js, React, and Tailwind CSS. It showcases our services, products, projects, and company information with a modern, responsive, and accessible design.

## About This Project

ACOB Lighting is a leading provider of solar and energy solutions. This website serves as our digital presence, offering information about our company, services, products, projects, and updates.

## Features

- Modern, responsive design with dark mode
- Dynamic navigation and content sections
- SEO-ready and accessible
- Modular, scalable codebase
- Integration with Sanity CMS (if applicable)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

- `app/` - Next.js app directory (pages, layouts, API routes)
- `components/` - Reusable UI components and content sections
- `public/` - Static assets (images, icons, favicon)
- `styles/` - Global and component styles
- `lib/` - Utility functions and data
- `sanity/` - Sanity CMS configuration (if used)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Git Workflow & Code Quality

This project uses automated tools to ensure code quality and consistent commit messages.

### Pre-commit Hooks

- **Prettier**: Automatically formats your code before each commit
- **Commit Message Validation**: Ensures commit messages follow conventional commit format

### Commit Message Format

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies, etc.
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Revert previous commit

**Examples:**

```bash
feat: add contact form validation
fix(auth): resolve login redirect issue
docs: update API documentation
style: format code with prettier
```

### Available Scripts

- `npm run format`: Format all files with Prettier
- `npm run format:check`: Check if files are properly formatted
- `npm run commit`: Interactive commit with commitizen

### Making Commits

1. **Interactive Commit (Recommended):**

   ```bash
   npm run commit
   ```

   This will guide you through creating a proper commit message.

2. **Manual Commit:**
   ```bash
   git add .
   git commit -m "type: description"
   ```
   The commit message will be validated automatically.

### What Happens on Commit

1. Prettier automatically formats your staged files
2. Commit message is validated against conventional commit rules
3. If validation fails, the commit is rejected with helpful error messages

## Contribution Guidelines

- Fork the repository and create a new branch for your feature or fix.
- Ensure code is clean, modular, and well-documented.
- Follow the existing file and component structure.
- Use the provided commit workflow for all commits.
- Submit a pull request with a clear description of your changes.

## Design Philosophy

- User-first: Fast, accessible, and easy to navigate
- Scalable: Modular components and data-driven navigation
- Consistent: Branding and design system throughout
- Modern: Uses the latest best practices in React and Next.js

## Company Info

- [ACOB Lighting](https://acoblighting.com) (replace with actual URL)
- Contact: info@acoblighting.com (replace with actual email)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
