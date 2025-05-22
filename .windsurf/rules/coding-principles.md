---
trigger: model_decision
description: Best practice coding principle
globs: 
---
# Core Coding Principles

This document outlines the fundamental principles that should guide all code development in our project.

## Fail Fast

The fail-fast principle states that a system should immediately report any failure condition rather than trying to proceed with uncertain or incomplete data.

### Guidelines

1. **Early Validation**
   - Validate inputs at system boundaries
   - Check preconditions at the start of functions
   - Verify configuration and environment variables during startup

```typescript
// ❌ Don't hide failures
function processUser(user?: User) {
  if (!user?.name) user.name = 'default'; // Might crash later
  // ... more processing
}

// ✅ Fail fast
function processUser(user: User) {
  if (!user) throw new Error('User is required');
  if (!user.name) throw new Error('User name is required');
  // ... proceed with valid data
}
```

2. **Clear Error Messages**
   - Include specific error messages that identify the problem
   - Provide guidance on how to fix the issue
   - Include relevant context in error messages

```typescript
// ❌ Poor error message
if (!config) throw new Error('Invalid config');

// ✅ Clear, actionable error message
if (!config) {
  throw new Error(
    'Configuration object is missing.\n' +
    'Please ensure config.json exists in the project root\n' +
    'See README.md for configuration format.'
  );
}
```

3. **No Silent Failures**
   - Don't catch errors just to hide them
   - Don't substitute default values when requirements aren't met
   - Log errors appropriately before handling them

## KISS (Keep It Simple, Stupid)

The KISS principle emphasizes that simplicity should be a key goal in design and that unnecessary complexity should be avoided.

### Guidelines

1. **Simple Solutions First**
   - Start with the simplest solution that could work
   - Add complexity only when justified by requirements
   - Question any complexity that doesn't add clear value

```typescript
// ❌ Overcomplicated
function isEven(num: number): boolean {
  return !Boolean(num.toString(2).split('').reverse()[0]);
}

// ✅ Simple and clear
function isEven(num: number): boolean {
  return num % 2 === 0;
}
```

2. **Clear Intent**
   - Write code that reveals its purpose
   - Use clear, descriptive names
   - Prefer explicit over implicit behavior

```typescript
// ❌ Clever but unclear
const fn = (x: number[]) => x.reduce((a, b) => a + b) / x.length;

// ✅ Clear intent
function calculateAverage(numbers: number[]): number {
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}
```

3. **Minimal Dependencies**
   - Only add dependencies when they provide significant value
   - Consider the maintenance cost of each dependency
   - Prefer standard library solutions when reasonable

4. **Straightforward Flow**
   - Minimize nested conditionals
   - Keep functions focused on a single task
   - Make the happy path clear and linear

```typescript
// ❌ Complex nested logic
function processOrder(order: Order) {
  if (order.items) {
    if (order.items.length > 0) {
      if (order.paymentMethod) {
        if (order.paymentMethod.isValid) {
          // Process order
        }
      }
    }
  }
}

// ✅ Fail fast with clear flow
function processOrder(order: Order) {
  if (!order.items?.length) {
    throw new Error('Order must have items');
  }
  if (!order.paymentMethod?.isValid) {
    throw new Error('Valid payment method required');
  }
  // Process order
}
```

## Benefits

Following these principles leads to:
- More reliable systems
- Easier debugging
- Better developer experience
- Lower maintenance costs
- Faster onboarding
- Fewer bugs

## When to Break These Rules

While these principles are important, there may be justified exceptions:

1. **Performance Critical Code**
   - When performance requirements necessitate more complex solutions
   - Document why the complexity is necessary

2. **External System Requirements**
   - When integrating with systems that require specific patterns
   - Keep the complexity isolated to integration boundaries

3. **Gradual Migration**
   - When incrementally improving legacy systems
   - Document the technical debt and plan for improvement

In all cases, document why you're breaking the principle and ensure the team agrees with the approach.
