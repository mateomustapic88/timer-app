import { formatTime, formatDate, formatToday } from "./dateUtils";

describe("dateUtils", () => {
  test("formats timestamp to HH:mm:ss format", () => {
    const timestamp = "2023-11-14T10:30:15Z";
    expect(formatTime(timestamp)).toBe("11:30:15");
  });

  test("formats date to DD-MM-YYYY format", () => {
    const date = "2023-11-14";
    expect(formatDate(date)).toBe("14-11-2023");
  });

  test("formats today’s date to DD/MM/YYYY format", () => {
    const today = formatToday();
    const expectedFormat = /\d{2}\/\d{2}\/\d{4}/;
    expect(today).toMatch(expectedFormat);
  });
});
