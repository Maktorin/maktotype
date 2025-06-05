import { init, t, applyTranslations } from "../../src/ts/i18n";
import { describe, it, expect, beforeEach } from "vitest";

describe("i18n", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("loads russian strings", async () => {
    await init("ru");
    expect(t("about")).toBe("О сайте");
  });

  it("applies translations to DOM", async () => {
    await init("ru");
    document.body.innerHTML = '<span data-i18n="about"></span>';
    applyTranslations(document.body);
    expect(document.querySelector('span')!.textContent).toBe("О сайте");
  });
});
