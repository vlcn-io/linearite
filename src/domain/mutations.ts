import { DBAsync, TXAsync } from "@vlcn.io/xplat-api"
import { Issue, Description, Comment, FilterState } from "./SchemaType"

function colNames(obj: { [key: string]: unknown }) {
  return Object.keys(obj).map(key => `"${key}"`).join(', ');
}

function placeholders(obj: { [key: string]: unknown }) {
  return Object.keys(obj).map(() => '?').join(', ');
}

function values(obj: { [key: string]: unknown }) {
  return Object.values(obj);
}

function set(obj: { [key: string]: unknown }) {
  return Object.keys(obj).map(key => `"${key}" = ?`).join(', ');
}

export const mutations = {
  createIssue(tx: TXAsync, issue: Issue) {
    return tx.exec(
      `INSERT INTO issue (${colNames(issue)}) VALUES (${placeholders(issue)})`,
      values(issue)
    );
  },

  createDescription(tx: TXAsync, desc: Description) {
    return tx.exec(
      `INSERT INTO description (${colNames(desc)}) VALUES (${placeholders(desc)})`,
      values(desc)
    );
  },

  createIssueWithDescription(tx: TXAsync, issue: Issue, desc: Description) {
    return tx.exec(
      `INSERT INTO issue (${colNames(issue)}) VALUES (${placeholders(issue)})`,
      values(issue)
    ).then(() => {
      return tx.exec(
        `INSERT INTO description (${colNames(desc)}) VALUES (${placeholders(desc)})`,
        values(desc)
      );
    });
  },

  createComment(tx: TXAsync, comment: Comment) {
    return tx.exec(
      `INSERT INTO comment (${colNames(comment)}) VALUES (${placeholders(comment)})`,
      values(comment)
    );
  },

  putFilterState(tx: TXAsync, filterState: FilterState) {
    return tx.exec(
      `INSERT INTO filter_state (${colNames(filterState)}) VALUES (${placeholders(filterState)})
        ON CONFLICT DO UPDATE SET ${set(filterState)}`,
      values(filterState)
    );
  },

  updateIssue(tx: TXAsync, issue: Issue) {
    return tx.exec(
      `UPDATE issue SET ${set(issue)} WHERE id = ?`,
      [...values(issue), issue.id]
    );
  },

  updateDescription(tx: TXAsync, desc: Description) {
    return tx.exec(
      `UPDATE description SET ${set(desc)} WHERE id = ?`,
      [...values(desc), desc.id]
    );
  },

  async deleteIssue(tx: TXAsync, id: string) {
    await tx.exec(
      `DELETE FROM issue WHERE id = ?`,
      [id]
    );
    await tx.exec(
      `DELETE FROM description WHERE id = ?`,
      [id]
    );
    await tx.exec(
      `DELETE FROM comment WHERE issueId = ?`,
      [id]
    );
  }
};
