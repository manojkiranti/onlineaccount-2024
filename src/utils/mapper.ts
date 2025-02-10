const toSnakeCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

export const mapObjectKeysToSnakeCase = <T extends Record<string, any>>(
  obj: T,
): Record<string, any> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
};

const toCamelCase = (str: string): string => {
  return str.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
};

export const mapObjectKeysToCamelCase = <T extends Record<string, any>>(
  obj: T,
): Record<string, any> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = obj[key];
      return acc;
    },
    {} as Record<string, any>,
  );
};
