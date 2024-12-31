export default function isString<T>(
  value: T
): value is T extends string ? T : never {
  return typeof value === "string";
}
