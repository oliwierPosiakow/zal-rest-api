import { describe, expect, it, spyOn } from "bun:test";
import db from "db";
import cron from "node-cron";

import type { Book } from "@models/book.model";

import { startAddBookCron } from "@jobs/add-book";

describe("addBook", () => {
  it("should schedule a cron job that inserts a book", () => {
    const scheduleSpy = spyOn(cron, "schedule");

    startAddBookCron();

    expect(scheduleSpy).toHaveBeenCalled();
    const args = scheduleSpy.mock.calls[0];
    expect(args?.[0]).toBe("* * * * *");
  });

  it("should insert a new book into the database when executed manually", () => {
    const title = `Test book ${Math.random()}`;
    db.prepare("DELETE FROM books").run();

    const insert = db
      .prepare("INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)")
      .run(title, "Autor", 2023);

    const book = db.prepare("SELECT * FROM books WHERE id = ?").get(insert.lastInsertRowid) as Book;
    expect(book.title).toBe(title);
  });
});
