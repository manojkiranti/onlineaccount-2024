const CDN_URL = import.meta.env.VITE_CDN_URL;

export const getIconsUrl = (icon: string) => {
  return `${CDN_URL}/${icon}`;
};
