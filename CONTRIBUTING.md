# Contributing to Links

Thank you for your interest in contributing to Links! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Issues](#issues)
  - [Pull Requests](#pull-requests)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)
- [Security](#security)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Issues

Before creating a new issue:

- Search existing issues to avoid duplicates
- Use the appropriate issue template:
  - Bug Report: For reporting bugs
  - Feature Request: For suggesting enhancements
  - Documentation: For documentation improvements

When creating an issue, please provide as much relevant information as possible.

### Pull Requests

1. Fork the repository
```bash
git clone https://github.com/egeuysall/links.git
cd links
```
2. Create a new branch from the `main` branch
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes and commit them following our [commit guidelines](https://github.com/egeuysall/links/blob/development/SECURITY.md)
4. Push your branch to your fork
```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request against the `main` branch of the original repository

6. Wait for review and address any feedback

## Development Environment

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [pnpm](https://pnpm.io/) (Preferred package manager)

### Setup

1. Install dependencies
```bash
pnpm install
```
2. Start the development server
```bash
pnpm dev
```

3. Visit `http://localhost:3000` to see the application

### Project Structure

- `/components` - React components
- `/pages` - Next.js pages
- `/public` - Static assets
- `/styles` - CSS and styling
- `/lib` - Utility functions and helpers
- `/types` - TypeScript type definitions

## Coding Standards

This project follows these coding standards:

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible

### React and Next.js

- Use functional components with hooks
- Follow the React component structure in existing files
- Use Next.js best practices for routing and data fetching

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design principles
- Maintain consistent spacing and sizing

### General

- Write clear, descriptive variable and function names
- Add comments for complex logic
- Follow DRY (Don't Repeat Yourself) principles

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]



### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect code meaning (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to build process or auxiliary tools

#### Examples:

feat(auth): add email verification fix(links): resolve issue with link ordering docs: update installation instructions


## Testing

Before submitting your changes:

1. Ensure existing tests pass
```bash
pnpm test
```

2. Add tests for new features or bug fixes

3. Make sure your code passes linting
```bash
pnpm lint
```


## Documentation

- Update documentation for new features or changes to existing ones
- Use JSDoc comments for functions and components
- Keep the README.md up to date

## Release Process

1. Maintainers merge approved PRs into the `main` branch
2. Version numbers follow [Semantic Versioning](https://semver.org/)
3. Release notes are generated from commit messages
4. Releases are tagged in the repository

## Security

### Reporting Security Issues

If you discover a security vulnerability:

1. Do **not** disclose it publicly
2. Email security concerns to [hello@egeuysal.com](mailto:hello@egeuysal.com)
3. Include detailed information about the vulnerability
4. For urgent matters, contact +1 (657) 900-0231

### Security Best Practices

- Keep dependencies updated
- Use environment variables for sensitive data
- Follow secure coding practices
- Be cautious with third-party libraries

## Community

- Be respectful and inclusive in all interactions
- Help others who have questions
- Share your successful implementations with the community

---

Thank you for contributing to Links! Your efforts help make this project better for everyone.

Last updated: 2023-03-30
