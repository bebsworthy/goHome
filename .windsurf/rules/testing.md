---
trigger: model_decision
description: Server testing code organisation
globs: 
---
# Testing Guidelines

## Directory Structure

Tests are organized in the following structure:
```
packages/server/
├── test/
│   ├── setup.ts           # Global test setup and environment configuration
│   ├── unit/             # Unit tests
│   │   └── *.test.ts     # Unit test files
│   └── integration/      # Integration tests
│       └── *.test.ts     # Integration test files
```

## Environment Setup

1. Create a `.env.test` file in the server package directory with required variables:
```
SNCF_API_KEY=your_api_key
TEST_SNCF_FROM_STATION_ID=your_test_station_id
TEST_SNCF_TO_STATION_ID=your_test_station_id
```

2. Environment variables are automatically loaded and validated in `test/setup.ts`

## Running Tests

Use the following npm scripts:
- `pnpm test:unit` - Run unit tests only
- `pnpm test:integration` - Run integration tests only
- `pnpm test:all` - Run all tests

## Test File Naming

- Unit tests: `test/unit/*.test.ts`
- Integration tests: `test/integration/*.test.ts`
- Test files should match their source file name (e.g., `sncf.ts` → `sncf.test.ts`)

## Test Structure

1. **Unit Tests**
   - Focus on testing individual functions and methods in isolation
   - Use mocks for external dependencies (e.g., API calls)
   - Group related tests using `describe` blocks
   - Use clear, descriptive test names that explain the scenario
   - Example:
   ```typescript
   describe('Module Name', () => {
     describe('functionName', () => {
       it('should handle successful case', async () => {
         // Test implementation
       });
       
       it('should handle error case', async () => {
         // Test implementation
       });
     });
   });
   ```

2. **Integration Tests**
   - Test interactions between multiple components
   - Use real API calls with test credentials
   - Focus on end-to-end workflows
   - Handle cleanup in `afterEach` or `afterAll` blocks

## Mocking

1. **API Calls**
   ```typescript
   const mockFetch = vi.fn();
   global.fetch = mockFetch;
   
   beforeEach(() => {
     vi.clearAllMocks();
   });
   ```

2. **Environment Variables**
   ```typescript
   beforeEach(() => {
     process.env.VARIABLE_NAME = 'test_value';
   });
   ```

## Best Practices

1. **Test Independence**
   - Each test should be independent and not rely on other tests
   - Reset state in `beforeEach` blocks
   - Clean up after tests in `afterEach` blocks

2. **Error Handling**
   - Test both success and error scenarios
   - Verify error messages and status codes
   - Test edge cases and boundary conditions

3. **Assertions**
   - Use specific assertions (e.g., `toHaveProperty` instead of `toBeTruthy`)
   - Test for both positive and negative cases
   - Verify all relevant aspects of the response

4. **API Testing**
   - Verify correct URL construction
   - Check header presence and values
   - Validate request parameters
   - Test parameter encoding

5. **Type Safety**
   - Use TypeScript for test files
   - Verify type constraints in tests
   - Test type validation errors

## Documentation

1. **Test Description**
   - Use clear, descriptive test names
   - Document test data and assumptions
   - Explain complex test setups

2. **Comments**
   - Add comments for non-obvious test logic
   - Document mock behavior and assumptions
   - Explain complex assertions

## Continuous Integration

1. **Test Scripts**
   - All tests must pass before merging
   - Run both unit and integration tests
   - Verify test coverage requirements

2. **Coverage Requirements**
   - Maintain high test coverage for critical paths
   - Document untested edge cases
   - Focus on quality over quantity
