# @bisham/query-factory

A simple, type-safe utility to create and manage React Query queries effortlessly. This package helps you create queries with consistent keys and offers helper methods to work with your queries in both React components and vanilla JavaScript.

## Introduction

`@bisham/query-factory` is designed to simplify your work with [React Query](https://tanstack.com/query/v4) by letting you create query functions with a consistent query key pattern and providing a range of helper methods to manage your queries. Whether you're working in a React component or in vanilla JavaScript, this package has got you covered.

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

- A **query key**: to uniquely identify the query.
- A **query function**: to fetch the data.

### Example: Fetching Todos

Create a query to fetch a todo item by its ID:

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

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

// Create a query for fetching todos by ID
export const useGetTodos = createQuery(
  {
    // Define a dynamic query key using parameters
    queryKey: (params: { id: string | number }) => ["todos", params],
    // Define the function to fetch the todo item
    queryFn: ({ params }) =>
      axios
        .get<TodoItem>(
          `https://jsonplaceholder.typicode.com/todos/${params.id}`
        )
        .then((res) => res.data),
  },
  queryClient
);

// Create a query for fetching users
export const useGetUsers = createQuery(
  {
    // Use a static query key for a list of users and optionally include queryOptions
    queryKey: () => ["user", "list"],
    // Define the function to fetch the users list and optionally include queryOptions
    queryFn: () =>
      axios
        .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => res.data),
    // Optionally set how long the data is considered fresh (1 minute)
    staleTime: 60 * 1000,
  },
  queryClient
);
```

## Using the Queries in React

Once you have defined your queries, you can use them directly in your React components. Here’s an example:

```jsx
import React from 'react';
import { useGetTodos, useGetUsers } from './your-query-file';

function App() {
    // Fetch a todo item with id 1 and optionally include queryOptions
    const { data: todoData, isLoading: todosLoading } = useGetTodos({ params: { id: 1 }, staleTime: 5 * 60 * 1000 });
    // Fetch a list of users and optionally include queryOptions and overide defaults
    const { data: usersData, isLoading: usersLoading } = useGetUsers({staleTime: 5 * 60 * 1000);

    if (todosLoading || usersLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Todo Item</h1>
            <p>{todoData?.title}</p>

            <h1>User List</h1>
            <ul>
                {usersData.map(user => (
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

## Advanced Usage

`@bisham/query-factory` provides several helper functions that make it easy to interact with your queries beyond just fetching data.

### Helper Functions

- **Get Query Key**
  Retrieve the query key for a specific query.

  ```typescript
  const todoQueryKey = useGetTodos.getQueryKey({ params: { id: 1 } });
  const userQueryKey = useGetUsers.getQueryKey();
  ```

- **Get Query Options**
  Retrieve the options used for a query.

  ```typescript
  const todoQueryOptions = useGetTodos.getQueryOptions({ params: { id: 1 } });
  const userQueryOptions = useGetUsers.getQueryOptions();
  ```

- **Access Query Data**
  Get the cached data for a query.

  ```typescript
  const todoData = useGetTodos.getQueryData({ params: { id: 1 } });
  const allUsersData = useGetUsers.getQueryData();
  ```

- **Refetching Queries**
  Manually refetch queries when needed.

  ```typescript
  useGetTodos.refetchQuery({ params: { id: 1 } });
  useGetUsers.refetchQuery();
  // To refetch all queries that match the key pattern:
  useGetTodos.refetchAllQueries();
  ```

- **Prefetching Data**
  Load data in advance.

  ```typescript
  useGetTodos.prefetchQuery({ params: { id: 2 } });
  useGetUsers.prefetchQuery();
  ```

- **Setting Query Data**
  Manually update the query data.

  ```typescript
  useGetTodos.setQueryData({
    params: { id: 100 },
    updater: {
      userId: 4242,
      id: 42,
      title: "Example Todo",
      completed: false,
    },
  });
  ```

- **Invalidating and Removing Queries**
  Invalidate or remove queries from the cache.

  ```typescript
  useGetTodos.invalidateQuery({ params: { id: 1 } });
  useGetUsers.invalidateQuery();

  // Invalidate or remove all queries that match the key pattern:
  useGetTodos.invalidateAllQueries();
  useGetUsers.removeAllQueries();
  ```

## API Overview

When you use the `createQuery` function, you pass two main arguments:

1.  **Configuration Object**:

    - `queryKey`: A function (or static value) that returns a unique key for the query. When using a function, you can pass parameters.
    - `queryFn`: The function that fetches your data. This function receives an object with the `params` passed in.
    - Other React Query options (like `staleTime`) can also be included.

2.  **Query Client**:
    Pass your instance of React Query's `QueryClient` to enable features such as prefetching and cache invalidation.

The returned query object includes helper methods to:

- Get the query key or options.
- Access, set, and remove query data.
- Refetch or prefetch queries.
- Invalidate queries.

## Contributing

Contributions are welcome! If you find a bug or want to enhance the package, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Happy querying with **@bisham/query-factory**!
