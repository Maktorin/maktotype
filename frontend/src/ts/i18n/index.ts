import { UiLanguage } from "@monkeytype/contracts/schemas/configs";

let translations: Record<string, string> = {};

async function loadFile(lang: UiLanguage): Promise<Record<string, string>> {
  switch (lang) {
    case "ru":
      return (await import("./ru.json")).default as Record<string, string>;
    default:
      return {};
  }
}

export async function init(lang: UiLanguage): Promise<void> {
  translations = await loadFile(lang);
  applyTranslations();
}

export function t(key: string): string {
  return translations[key] ?? key;
}

export function applyTranslations(root: HTMLElement = document.body): void {
  const elements = root.querySelectorAll<HTMLElement>("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = t(key);
    }
  });
}

