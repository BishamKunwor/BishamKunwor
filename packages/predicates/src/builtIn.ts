// We're adding additional Type Checking and Returning Actual Type if it passes our constrains

export function isString<T>(value: T): value is T extends string ? T : never {
  return typeof value === 'string';
}

export function isFunction<T>(func: T): func is T extends Function ? T : never {
  return typeof func === 'function';
}

export function isNumber<T>(value: T): value is T extends number ? T : never {
  return typeof value === 'number';
}

export function isUndefined<T>(
  value: T,
): value is T extends undefined ? T : never {
  return value === undefined;
}

export function isNull<T>(value: T): value is T extends null ? T : never {
  return value === null;
}

export function isObject<T>(
  value: T,
): value is T extends Record<any, any> ? T : never {
  return Boolean(value) && typeof value === 'object';
}

export function isBoolean<T>(value: T): value is T extends boolean ? T : never {
  return typeof value === 'boolean';
}
