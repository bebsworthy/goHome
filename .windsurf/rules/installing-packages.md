---
trigger: model_decision
description: How to install packages
globs: 
---
- Use `pnpm`.
- Don't install in root. Install in the appropriate packages under `/packages/`, package used in the frontend should be in `/packages/ui`, packages for the backend should be in `/packages/server`:

```sh
cd packages/ui
pnpm add ...
```
