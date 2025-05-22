---
description: UI technical documentation
globs: 
alwaysApply: false
---
# UI Package Documentation

## Project Structure

```
packages/ui/
├── src/
│   ├── components/     # Reusable UI components
│   ├── config/        # Configuration files
│   ├── error-handling/ # Error boundary and fallbacks
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── routes/        # Routing configuration
│   ├── sections/      # Layout sections (Header, Sidebar)
│   ├── theme/         # MUI theme customization
│   └── utils/         # Utility functions
```

## Technology Stack

### Core Technologies
- React 19 with TypeScript
- Vite 6 for build tooling
- Material-UI (MUI) v6 for components
- React Router v7 for routing
- Jotai for state management

### Testing Tools
- Vitest for unit testing
- Playwright for E2E testing
- React Testing Library for component testing

### Development Tools
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit checks

## Component Guidelines

### 1. Component Structure
```typescript
// MyComponent.tsx
import { type FC } from 'react';
import { Box } from '@mui/material';

interface MyComponentProps {
  // Props interface
}

const MyComponent: FC<MyComponentProps> = (props) => {
  // Component implementation
};

export default MyComponent;
```

### 2. Styling Approach
- Use MUI's `sx` prop for component-specific styling
- Define reusable styles in theme/components
- Follow this pattern:
```typescript
<Box
  sx={(theme) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  })}
>
```

### 3. State Management
- Use Jotai for global state
- Follow this pattern for atoms:
```typescript
// atoms/journey.ts
import { atom } from 'jotai';

export const journeyAtom = atom({
  from: null,
  to: null,
  date: null,
});
```

## Error Handling

### 1. Component Error Boundaries
```typescript
import { withErrorHandler } from '@/error-handling';
import ComponentFallback from './fallback';

const ComponentWithErrorHandler = withErrorHandler(
  Component,
  ComponentFallback
);
```

### 2. API Error Handling
```typescript
try {
  const response = await api.call();
  // Handle success
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API-specific error
  } else {
    // Handle generic error
  }
}
```

## Testing Standards

### 1. Unit Tests (Vitest)
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 2. E2E Tests (Playwright)
```typescript
test('user journey', async ({ page }) => {
  await page.goto('/');
  await page.fill('[name="from"]', 'Paris');
  await page.click('button[type="submit"]');
  await expect(page.locator('.results')).toBeVisible();
});
```

## Performance Guidelines

### 1. Code Splitting
- Use lazy loading for routes
- Follow this pattern:
```typescript
const MyPage = lazy(() => import('@/pages/MyPage'));
```

### 2. Memoization
- Use React.memo for expensive renders
- Use useMemo for expensive computations
- Use useCallback for callback functions passed as props

### 3. Image Optimization
- Use responsive images with srcset
- Lazy load images below the fold
- Use appropriate image formats (WebP with fallbacks)

## Accessibility Standards

### 1. ARIA Attributes
- Use semantic HTML elements
- Add aria-labels where necessary
- Ensure proper focus management

### 2. Keyboard Navigation
- All interactive elements must be keyboard accessible
- Use proper focus trapping in modals
- Implement skip links for main content

## API Integration

### 1. API Client Setup
```typescript
// api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new ApiError(response);
    return response.json();
  },
  // ... other methods
};
```

### 2. Environment Variables
Required variables in `.env`:
```
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
```

## Build and Deployment

### 1. Development
```bash
# Start development server
pnpm dev

# Run tests
pnpm test:unit
pnpm test:e2e

# Check types
pnpm ts:check
```

### 2. Production Build
```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

### 3. Environment Configuration
- Development: `.env.development`
- Production: `.env.production`
- Test: `.env.test`

## Version Control

### 1. Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Release: `release/version`

### 2. Commit Messages
Follow conventional commits:
```
feat: add journey search_files component
fix: correct station autocomplete
docs: update component documentation
```

## Monitoring and Analytics

### 1. Error Tracking
- Use error boundaries for React errors
- Implement global error handler
- Log errors to monitoring service

### 2. Performance Monitoring
- Track Core Web Vitals
- Monitor bundle size
- Track API response times

## Security Guidelines

### 1. Input Validation
- Validate all user inputs
- Sanitize data before rendering
- Use Content Security Policy

### 2. Authentication
- Handle JWT tokens securely
- Implement proper token refresh
- Use secure HTTP-only cookies
