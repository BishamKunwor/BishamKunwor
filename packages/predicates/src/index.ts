export class Predicates {
  static isString(value: unknown): value is string {
    return typeof value === "string";
  }

  static isEmptyString(value: unknown): value is "" {
    return this.isString(value) && value.length === 0;
  }

  static isNotEmptyString(value: unknown): value is string {
    return this.isString(value) && value.length > 0;
  }

  static isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  static isUndefined(value: unknown): value is undefined {
    return value === undefined;
  }

  static isNull(value: unknown): value is null {
    return value === null;
  }

  static isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
  }

  static isEmpty(value: unknown): value is null | undefined {
    return this.isNull(value) || this.isUndefined(value);
  }

  static isNotEmpty(value: unknown): value is {} {
    return !this.isEmpty(value);
  }

  static isFunction(func: unknown): func is Function {
    return typeof func === "function";
  }

  static isObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object";
  }

  static isEmptyObject(value: unknown): value is Record<string, unknown> {
    return this.isObject(value) && Object.keys(value).length === 0;
  }

  static isOnline() {
    return this.isBrowser() ? navigator.onLine : false;
  }

  static isEmptyArray(value: unknown): value is [] {
    return Array.isArray(value) && value.length === 0;
  }

  static isNotEmptyArray(value: unknown): value is Array<unknown> {
    return !this.isEmptyArray(value);
  }

  static isDate(value: unknown): value is Date {
    return value instanceof Date;
  }

  static isValidDateString(value: unknown): value is string {
    return this.isString(value) && !isNaN(new Date(value).getTime());
  }

  static isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof window.document !== "undefined" &&
      typeof window.document.createElement !== "undefined"
    );
  }
}
