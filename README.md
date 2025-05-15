### Todo List with Offline Support


- This is a simple POC for a todo list application that works offline and syncs with a server when user is back online.

- It uses Tanstack Query Persistors along with Service Worker to cache and serve the data when offline.

- It uses a queueing strategy to store and replay mutations that took place while offline. Changes are replayed in the order they were made.

- **Note:** This is a POC and **NOT** a production ready application.