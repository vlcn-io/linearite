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
      manualSetup={seedDB}
      Render={() => <App />}
  />)
}

async function seedDB(ctx: CtxAsync) {
  const existing = await ctx.db.execA(`SELECT 1 FROM issue LIMIT 1`);
  if (existing.length > 0) {
    return;
  }
  console.log('Seeding DB');
  await ctx.db.tx(async (tx) => {
    let i = 0;
    for (const [issue, description] of createTasks(10000)) {
      console.log(`Creating issue ${i++}`)
      await mutations.createIssue(tx, issue);
      await mutations.createDescription(tx, description);
    }
  });
  console.log('Done seeding DB');
}
