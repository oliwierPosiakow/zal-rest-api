import { startAddBookCron } from "@jobs/add-book";
import { startCheckOverdueLoansCron } from "@jobs/check-overdue-borrows";

export const setupCronJobs = () => {
  startAddBookCron();
  startCheckOverdueLoansCron();
};
