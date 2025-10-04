import { describe, expect, it, spyOn } from "bun:test";
import cron from "node-cron";

import { startCheckOverdueLoansCron } from "@jobs/check-overdue-borrows";

describe("checkOverdueLoansCron", () => {
  it("should schedule a cron job every minute", () => {
    const scheduleSpy = spyOn(cron, "schedule");

    startCheckOverdueLoansCron();

    expect(scheduleSpy).toHaveBeenCalledWith("* * * * *", expect.any(Function));
  });
});
