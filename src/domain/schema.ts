import { SchemaType } from './SchemaType.js'
// import { DbSchema, makeSchema, sql } from '@livestore/livestore'
import { PriorityType, StatusType } from '../types/issue.js'
import { schema } from '@vlcn.io/typed-sql'

export const SchemaName = 'schema.sql'

export const Schema = schema<SchemaType>`
CREATE TABLE IF NOT EXISTS issue (
  "id" 'ID_of<Issue>' PRIMARY KEY NOT NULL,
  "title" TEXT DEFAULT '',
  "creator" TEXT DEFAULT '',
  "priority" '"none" | "urgent" | "high" | "low" | "medium"' DEFAULT 'none' NOT NULL,
  "status" '"backlog" | "todo" | "in_progress" | "done" | "canceled"' DEFAULT 'todo' NOT NULL,
  "created" INTEGER NOT NULL,
  "modified" INTEGER NOT NULL,
  "kanbanorder" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "description" (
  "id" 'ID_of<Description>' PRIMARY KEY NOT NULL,
  "body" TEXT DEFAULT '' NOT NULL
);

CREATE TABLE IF NOT EXISTS "comment" (
  "id" 'ID_of<Comment>' PRIMARY KEY NOT NULL,
  "body" TEXT DEFAULT '' NOT NULL,
  "creator" TEXT DEFAULT '' NOT NULL,
  "issueId" TEXT NOT NULL,
  "created" INTEGER NOT NULL,
  "author" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "filter_state" (
  "id" 'ID_of<FilterState>' PRIMARY KEY NOT NULL,
  "orderBy" TEXT DEFAULT 'created' NOT NULL,
  "orderDirection" TEXT DEFAULT 'asc' NOT NULL,
  "status" '"backlog" | "todo" | "in_progress" | "done" | "canceled"',
  "priority" '"none" | "urgent" | "high" | "low" | "medium"',
  "query" TEXT
);
`

export interface FilterState {
  orderBy: string
  orderDirection: 'asc' | 'desc'
  status?: StatusType[]
  priority?: PriorityType[]
  query?: string
}
