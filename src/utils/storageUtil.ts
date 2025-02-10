type StorageType = 'localStorage' | 'sessionStorage';

const createStorageUtil = (
  storageType: StorageType,
  prefix: string = 'odin_',
) => {
  const storage =
    storageType === 'localStorage' ? localStorage : sessionStorage;

  const getPrefixedKey = (key: string): string => `${prefix}${key}`;

  return {
    getItem: <T>(key: string): T | null => {
      const item = storage.getItem(getPrefixedKey(key));
      return item ? (JSON.parse(item) as T) : null;
    },
    setItem: (key: string, value: unknown): void => {
      storage.setItem(getPrefixedKey(key), JSON.stringify(value));
    },
    removeItem: (key: string): void => {
      storage.removeItem(getPrefixedKey(key));
    },
  };
};

// Initialize with localStorage and prefix 'odin_'
export const storageUtil = createStorageUtil('localStorage', 'odin_');
