// import { LiveStoreProvider } from '@livestore/livestore/react'
// import { WebWorkerStorage } from '@livestore/livestore/storage/web-worker'
// import { schema } from './domain/schema'
import App from './App'
import { DBProvider } from "@vlcn.io/react";
import schemaContent from "./domain/schema.sql?raw";
import { SchemaName } from './domain/Schema';

export default function Root() {
  return (
    <DBProvider
    dbname="linear"
    schema={{
      name: SchemaName,
      content: schemaContent,
    }}
    Render={() => <App />}
  />)
}
