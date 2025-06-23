export function url(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return path.startsWith('/') ? base + path.slice(1) : base + path;
}