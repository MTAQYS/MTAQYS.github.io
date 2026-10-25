export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
