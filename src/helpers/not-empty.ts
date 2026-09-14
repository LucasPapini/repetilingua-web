export function isNotEmpty(obj: Record<string, any> | null | undefined): boolean {
  return !!obj && Object.keys(obj).length > 0;
}
