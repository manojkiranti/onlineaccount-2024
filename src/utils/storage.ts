const storagePrefix = 'odin_';

const storage = {
  getToken: (): string | null => {
    const token = window.localStorage.getItem(`${storagePrefix}token`);
    return token ? JSON.parse(token) : null;
  },
  setToken: (token: string): void => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: (): void => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
