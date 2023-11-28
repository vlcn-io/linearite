import { DBAsync, TXAsync } from "@vlcn.io/xplat-api";

export const mutations = {
  createIssue(tx: TXAsync) {

  }
};
// export const schema = makeSchema({
//   // TODO get rid of `app_state` alias once fixed https://github.com/livestorejs/livestore/issues/25
//   tables: { issue, description, comment, app_state: appState },
//   actions: {
//     createIssue: {
//       statement: {
//         sql: sql`INSERT INTO issue ("id", "title", "priority", "status", "created", "modified", "kanbanorder")
//           VALUES ($id, $title, $priority, $status, $created, $modified, $kanbanorder)`,
//         writeTables: ['issue'],
//       },
//     },
//     createDescription: {
//       statement: {
//         sql: sql`INSERT INTO description ("id", "body") VALUES ($id, $body)`,
//         writeTables: ['description'],
//       },
//     },
//     createComment: {
//       statement: {
//         sql: sql`INSERT INTO comment ("id", "body", "issueId", "created", "author")
//           VALUES ($id, $body, $issueId, $created, $author)`,
//         writeTables: ['comment'],
//       },
//     },
//     deleteIssue: {
//       statement: {
//         sql: sql`DELETE FROM issue WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     deleteDescriptin: {
//       statement: {
//         sql: sql`DELETE FROM description WHERE id = $id`,
//         writeTables: ['description'],
//       },
//     },
//     deleteComment: {
//       statement: {
//         sql: sql`DELETE FROM comment WHERE id = $id`,
//         writeTables: ['comment'],
//       },
//     },
//     deleteCommentsByIssueId: {
//       statement: {
//         sql: sql`DELETE FROM comment WHERE issueId = $issueId`,
//         writeTables: ['comment'],
//       },
//     },
//     updateIssue: {
//       statement: {
//         sql: sql`UPDATE issue SET title = $title, priority = $priority, status = $status, modified = $modified WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     updateIssueStatus: {
//       statement: {
//         sql: sql`UPDATE issue SET status = $status, modified = unixepoch() * 1000 WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     updateIssueKanbanOrder: {
//       statement: {
//         sql: sql`UPDATE issue SET kanbanorder = $kanbanorder, modified = unixepoch() * 1000 WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     updateIssueTitle: {
//       statement: {
//         sql: sql`UPDATE issue SET title = $title, modified = unixepoch() * 1000 WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     moveIssue: {
//       statement: {
//         sql: sql`UPDATE issue SET kanbanorder = $kanbanorder, status = $status, modified = unixepoch() * 1000 WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     updateIssuePriority: {
//       statement: {
//         sql: sql`UPDATE issue SET priority = $priority, modified = unixepoch() * 1000 WHERE id = $id`,
//         writeTables: ['issue'],
//       },
//     },
//     updateDescription: {
//       statement: {
//         sql: sql`UPDATE description SET body = $body WHERE id = $id`,
//         writeTables: ['description'],
//       },
//     },
//     upsertAppAtom: {
//       statement: {
//         sql: sql`INSERT INTO app_state (key, value) VALUES ($key, $value)
//           ON CONFLICT (key) DO UPDATE SET value = $value`,
//         writeTables: ['app_state'],
//       },
//     },
//   },
// })
