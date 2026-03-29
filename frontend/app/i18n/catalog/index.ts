import type { Locale } from "../types";
import { ptMessages } from "./pt";
import { enMessages } from "./en";
import { esMessages } from "./es";

export type MessageTree = Record<string, unknown>;

export const catalogs: Record<Locale, MessageTree> = {
  pt: ptMessages as MessageTree,
  en: enMessages as MessageTree,
  es: esMessages as MessageTree,
};
