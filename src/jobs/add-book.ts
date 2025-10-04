import db from "db";
import cron from "node-cron";

export const startAddBookCron = () => {
  cron.schedule("* * * * *", () => {
    const title = `Losowa książka #${Math.floor(Math.random() * 10000)}`;
    const author = "Automatyczny Autor";
    const publishedYear = 2000 + Math.floor(Math.random() * 25);

    const result = db
      .prepare("INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)")
      .run(title, author, publishedYear);

    console.log(`📘 Dodano książkę: ${title} (ID: ${result.lastInsertRowid})`);
  });

  console.log("⏰ Cron job uruchomiony: dodaje książkę co minutę");
};
