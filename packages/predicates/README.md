A utility class providing type-safe predicate functions for common value checks.

## Installation

```bash
npm install @bisham/predicates
```

## Usage

```typescript
import { Predicates } from '@bisham/predicates';

// Type-safe checks
if (Predicates.isString(value)) {
  // TypeScript knows value is string here
  console.log(value.toUpperCase());
}
```

## Available Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| **Type Checks** |
| `isString` | `(value: unknown): value is string` | Checks if value is a string |
| `isEmptyString` | `(value: unknown): value is ""` | Checks if value is an empty string |
| `isNotEmptyString` | `(value: unknown): value is string` | Checks if value is a non-empty string |
| `isNumber` | `(value: unknown): value is number` | Checks if value is a number |
| `isBoolean` | `(value: unknown): value is boolean` | Checks if value is a boolean |
| `isFunction` | `(func: unknown): func is Function` | Checks if value is a function |
| `isObject` | `(value: unknown): value is Record<string, unknown>` | Checks if value is an object (not null) |
| `isDate` | `(value: unknown): value is Date` | Checks if value is a Date instance |
| **Null/Undefined Checks** |
| `isNull` | `(value: unknown): value is null` | Checks if value is `null` |
| `isUndefined` | `(value: unknown): value is undefined` | Checks if value is `undefined` |
| `isEmpty` | `(value: unknown): value is null \| undefined` | Checks if value is `null` or `undefined` |
| `isNotEmpty` | `(value: unknown): value is {}` | Checks if value is neither `null` nor `undefined` |
| **Array Checks** |
| `isEmptyArray` | `(value: unknown): value is []` | Checks if value is an empty array |
| `isNotEmptyArray` | `(value: unknown): value is Array<unknown>` | Checks if value is a non-empty array |
| **Object Checks** |
| `isEmptyObject` | `(value: unknown): value is Record<string, unknown>` | Checks if value is an object with no properties |
| **Date Checks** |
| `isValidDateString` | `(value: unknown): value is string` | Checks if value is a valid date string |
| **Environment Checks** |
| `isBrowser` | `(): boolean` | Checks if current environment is a browser |
| `isOnline` | `(): boolean` | Returns online status (browser) or `false` (Node.js) |

## Examples

```typescript
import { Predicates } from '@bisham/predicates';

// Type guards with TypeScript narrowing
const value: unknown = "hello";

if (Predicates.isString(value)) {
  // TypeScript knows value is string
  console.log(value.length); // ✅ Works
}

// Check for empty values
if (Predicates.isEmpty(userInput)) {
  console.log("Input is required");
}

// Check arrays
if (Predicates.isNotEmptyArray(items)) {
  // TypeScript knows items is Array<unknown>
  items.forEach(item => console.log(item));
}

// Environment checks
if (Predicates.isBrowser()) {
  console.log("Running in browser");
}

if (Predicates.isOnline()) {
  console.log("User is online");
}
```
