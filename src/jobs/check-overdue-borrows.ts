import db from "db";
import cron from "node-cron";

export const startCheckOverdueLoansCron = () => {
  cron.schedule("* * * * *", () => {
    const now = new Date();

    const overdueLoans = db
      .prepare("SELECT * FROM loans WHERE dueDate < ? AND returned = 0")
      .all(now.toISOString());

    if (overdueLoans.length > 0) {
      console.log("⚠️  Wypożyczenia po terminie:");
      overdueLoans.forEach((loan: any) => {
        console.log(
          `➡️  Wypożyczenie ID: ${loan.id}, Użytkownik ID: ${loan.userId}, Książka ID: ${loan.bookId}, Termin: ${loan.dueDate}`,
        );
      });
    } else {
      console.log("✅ Brak wypożyczeń po terminie");
    }
  });

  console.log("⏰ Cron job uruchomiony: sprawdza wypożyczenia co minutę");
};
