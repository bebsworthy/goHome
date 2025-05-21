---
description: Project structure and file organization guidelines
globs: 
alwaysApply: false
---
# Project Structure

## Main Structure

- We use a pnpm workspaces
- The frontend web app is in `packages/ui`
- The backend server is in `packages/server`
- Packages are in the `packages` folderss

```tree
.
├── packages       
│   ├── server    # Backend server
│   │   └── src
│   └── ui        # Frontend PWA React application
│       ├── dist  # Build files
│       ├── e2e   # e2e playwright test
│       │   ├── hotkeys
│       │   └── theme
│       ├── envi                 # environment files
│       ├── public               # public assets
│       ├── src     
│       │   ├── components       # Global react components
│       │   ├── config           # UI application configuration
│       │   ├── error-handling   # Error handling components
│       │   ├── hooks            # Global application hooks
│       │   ├── pages            # Application pages
│       │   ├── routes           # Routes
│       │   ├── sections         # Page sections components
│       │   ├── theme            # Application theme
│       │   └── utils            # Utility methods
│       │       ├── insertIf
│       │       └── loader
└── script # shell scripts

```

## File Naming and Organization

- Use kebab case for route directories (e.g., `api/hello-world/route`)
- Use PascalCase for components (e.g. `components/Button.tsx`)
- Shadcn components are in `components/ui`
- All other components are in `components/`
- Colocate files in the folder where they're used unless they can be used across the app
- If a component can be used in many places, place it in the `components` folder

## New Pages

- Create new pages at: `apps/web/app/(app)/PAGE_NAME/page.tsx`
- Components for the page are either in `page.tsx` or in the `apps/web/app/(app)/PAGE_NAME` folder
- Pages are Server components for direct data loading
- Use `swr` for data fetching in deeply nested components
- Components with `onClick` must be client components with `use client` directive
- Server action files must start with `use server`

## Utility Functions

- Create utility functions in `utils/` folder for reusable logic
- Use lodash utilities for common operations (arrays, objects, strings)
- Import specific lodash functions to minimize bundle size:
  ```ts
  import groupBy from "lodash/groupBy";
  ```
