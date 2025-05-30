---
description: API documentation guidelines
globs: 
alwaysApply: false
---
# API Documentation Guidelines

This document outlines the standards and process for documenting API endpoints in our project.

## File Structure

- All API documentation should be placed in the `documentation/api-sncf/` directory
- Each endpoint should have its own `.md` file
- File names should be descriptive and match the endpoint's primary function (e.g., `places.md`, `journeys.md`)

## Document Format

Each API documentation file must follow this structure:

```markdown
---
title: [Endpoint Name] API Endpoint
description: [Brief one-line description of the endpoint]
---

# [Endpoint Name] API Endpoint

[Detailed description of what the endpoint does and when to use it]

## Endpoint

```
[HTTP Method] [Full endpoint URL]
```

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| [param1] | [type] | [Yes/No] | [Description] |
...

## Response Format

[Description of the response structure]

### [Object Name]

| Field | Type | Description |
|-------|------|-------------|
| [field1] | [type] | [Description] |
...

## Example Request

```bash
[curl example with all required headers]
```

## Example Response

```json
[Example JSON response]
```

## Notes

- [Important note 1]
- [Important note 2]
...
```

## Required Sections

1. **Frontmatter**: Must include `title` and `description`
2. **Endpoint**: Full URL with HTTP method
3. **Query Parameters**: All possible parameters, their types, and whether they're required
4. **Response Format**: Detailed breakdown of response structure
5. **Example Request**: Working curl command
6. **Example Response**: Real-world response example
7. **Notes**: Important considerations, limitations, or special cases

## Style Guidelines

1. **Tables**:
   - Use tables for structured data like parameters and response fields
   - Always include headers
   - Align columns properly

2. **Code Blocks**:
   - Use appropriate language hints (bash, json, etc.)
   - Format JSON with proper indentation
   - Include all necessary headers in examples

3. **Descriptions**:
   - Be concise but complete
   - Use consistent terminology
   - Explain all possible values for enums
   - Document any default values

4. **Examples**:
   - Use realistic data
   - Show successful cases
   - Include common error scenarios if applicable

## Best Practices

1. Keep documentation up to date with code changes
2. Include rate limiting information if applicable
3. Document authentication requirements
4. Mention any dependencies or prerequisites
5. Use consistent formatting across all documentation files
6. Include pagination details if the endpoint supports it
7. Document any specific error codes or messages

## Validation

Before submitting documentation:

1. Verify all examples work as shown
2. Check that all parameters are documented
3. Ensure response format matches actual API behavior
4. Validate JSON examples for syntax
5. Check markdown formatting renders correctly

## Example

See `documentation/api-sncf/places.md` for a reference implementation of these guidelines.
