export type Locale = "pt" | "en" | "es";

export const LOCALES: Locale[] = ["pt", "en", "es"];

export const LOCALE_STORAGE_KEY = "qrcoffee_locale";

export function localeToBcp47(locale: Locale): string {
  switch (locale) {
    case "pt":
      return "pt-BR";
    case "en":
      return "en-US";
    case "es":
      return "es-ES";
    default:
      return "pt-BR";
  }
}
