type Nested = string | number | boolean | null | Nested[] | { [k: string]: Nested };

function getByPath(obj: Nested | undefined, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    if (typeof cur !== "object") return undefined;
    cur = (cur as Record<string, Nested>)[p];
  }
  return cur;
}

/** Replaces {name} placeholders in a string */
export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  );
}

export function translate(
  messages: Nested,
  path: string,
  vars?: Record<string, string | number>
): string {
  const raw = getByPath(messages, path);
  if (typeof raw !== "string") return path;
  return interpolate(raw, vars);
}
