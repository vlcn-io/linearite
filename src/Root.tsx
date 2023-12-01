import App from './App'
import { CtxAsync, DBProvider } from "@vlcn.io/react";
import schemaContent from "./domain/schema.sql?raw";
import { DBName, SchemaName } from './domain/Schema';
import { createTasks } from './seed/createIssues';
import { mutations } from './domain/mutations';

export default function Root() {
  return (
    <DBProvider
      dbname={DBName}
      schema={{
        name: SchemaName,
        content: schemaContent,
      }}
      Render={() => <App />}
  />)
}
