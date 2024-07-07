import isEmpty from './isEmpty';

export default function isNotEmpty<T>(
  value: T,
): value is T extends null | undefined ? never : T {
  return !isEmpty(value);
}
