## Sandbox with Live Example

[StackBlitz Demo](https://stackblitz.com/edit/vitejs-vite-1agrrdzq?file=src%2Findex.css,src%2FApp.tsx&terminal=dev)

## Introduction

`@bisham/query-factory` is designed to simplify your work with [React Query](https://tanstack.com/query/latest) by letting you create query functions with a consistent query key pattern and providing a range of helper methods to manage your queries. Furthermore, Query Key management is done by createQuery Itself.

## Installation

Make sure you have React Query and axios installed. You can install all required packages using npm or yarn:

```bash
npm install @bisham/query-factory
```

or

```bash
yarn add @bisham/query-factory
```

## Getting Started

### Creating a Query

The package exposes a `createQuery` function that helps you set up your query by defining:

- A **query key** fn that returns query key array to uniquely identify the query.

- A **query function**: to fetch the data.

### Examples:

Create a query to fetch user list (When query key array does not depend on state)

```typescript
import { createQuery } from "@bisham/query-factory";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

// Initialize the React Query client
export const queryClient = new QueryClient();

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Create a query for fetching users
export const useGetUsers = createQuery(
  // queryOptions for createQuery (same as in useQuery)
  {
    // queryKey is a fn that return an queryKey array (Only change as compared to queryOptions of useQuery)
    queryKey: () => ["user", "list"],
    queryFn: () =>
      axios
        .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => res.data),
    staleTime: 60 * 1000,
    // Include all other queryOptions here
  },
  // queryClient is passed manually to handle prefetching, invalidation and more features
  queryClient
);
```

## Using the Query in React

Once you have defined your queries, you can use them directly in your React components:

```jsx
import React from "react";
import { useGetUsers } from "./your-query-file";

function App() {
  // All the return value of useQuery is accessible here
  const { data: usersData, isLoading: usersLoading } = useGetUsers({
    placeholder: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    // add more queryOptions here to add or override global settings which was configured while setting up useGetTodos
  });

  if (todosLoading || usersLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todo Item</h1>
      <p>{todoData?.title}</p>

      <h1>User List</h1>
      <ul>
        {usersData.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Create a query to fetch post item (When query key array depend on state)

```typescript
import { createQuery } from "@bisham/query-factory";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

// Initialize the React Query client
export const queryClient = new QueryClient();

export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const useGetTodos = createQuery(
  {
    // All dynamic state that cause re-fetching should be passeed in params obj of queryKey with proper Type annotation
    queryKey: (params: { id: string | number }) => ["todos", params],
    // If queryKey includes params then it is accessible from queryFn and can be used to sync with latest value of params
    queryFn: ({ params }) =>
      axios
        .get<TodoItem>(
          `https://jsonplaceholder.typicode.com/todos/${params.id}`
        )
        .then((res) => res.data),
  },
  // queryClient is passed manually to handle prefetching, invalidation and more features
  queryClient
);
```

## Using the Query in React

Once you have defined your queries, you can use them directly in your React components:

```jsx
import React from "react";
import { useGetUsers } from "./your-query-file";

function App() {
  // All the return value of useQuery is accessible here
  const { data: usersData, isLoading: usersLoading } = useGetUsers({
    placeholder: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    // add more queryOptions here to add or override global settings which was configured while setting up useGetTodos
  });

  if (todosLoading || usersLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todo Item</h1>
      <p>{todoData?.title}</p>

      <h1>User List</h1>
      <ul>
        {usersData.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Helper Methods (Can be use Outside React Lifecycle i.e., Vanila JS)

When you create a query using `createQuery`, it not only returns a React Query hook but also provides a range of **helper methods** to manage your queries more effectively:

| Method                 | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `getQueryKey`          | Get the query key for a given set of params.              |
| `getQueryOptions`      | Get the React Query options for a given set of params.    |
| `getQueryData`         | Retrieve cached data for a given set of params.           |
| `getQueriesData`       | Retrieve all matching cached data for the base query key. |
| `setQueryData`         | Set or update cached data for a given set of params.      |
| `removeQueryData`      | Remove cached data for a specific query instance.         |
| `removeAllQueriesData` | Remove all cached data that match the base query key.     |
| `invalidateQuery`      | Invalidate (mark stale) a specific query instance.        |
| `invalidateAllQueries` | Invalidate all queries matching the base query key.       |
| `prefetch`             | Prefetch data for a specific query instance.              |
| `refetchQuery`         | Refetch data for a specific query instance.               |
| `refetchAllQueries`    | Refetch all queries matching the base query key.          |

### Example Usage of Helper Methods

```typescript
// Get the query key for a todo
const todoQueryKey = useGetTodos.getQueryKey({ params: { id: 1 } });
const userQueryKey = useGetUsers.getQueryKey();

// Get cached data
const todoData = useGetTodos.getQueryData({ params: { id: 1 } });
const allUserData = useGetUsers.getQueriesData();

// Invalidate and refetch data
await useGetTodos.invalidateQuery({ params: { id: 1 } });
await useGetUsers.invalidateAllQueries();
await useGetUsers.refetchAllQueries();

// Prefetch data
await useGetTodos.prefetch({ params: { id: 2 } });

// Update cached data
useGetTodos.setQueryData({
  params: { id: 42 },
  updater: {
    userId: 4242,
    id: 42,
    title: "Updated Todo",
    completed: true,
  },
});

// Remove cached data
useGetTodos.removeQueryData({ params: { id: 42 } });
useGetUsers.removeAllQueriesData();
```

## API Overview

When you use `createQuery`, you provide:

1.  **Configuration Object**:

    - `queryKey`: A function to generate dynamic query keys array.

    - `queryFn`: The function to fetch the data, which receives may receive `{ params }` if it was defined on `queryKey` fn. This is used to fetch data based on the params value

    - All other React Query options (like `staleTime`) can be added as neccessary.

2.  **Query Client**:

    - Pass your instance of React Query's `QueryClient`.
    - This queryClient instance handles all refetching, prefetching, invalidation and more features

The returned hook has the **same signature as `useQuery`**, plus **powerful helper methods** to manage your queries' lifecycle and cached data.

## Contributing

Contributions are welcome! If you find a bug or want to enhance the package, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Happy querying with **@bisham/query-factory**!
