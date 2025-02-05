export function omit<T extends object>(obj: any, keys: Array<string>): T {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {} as T);
}
