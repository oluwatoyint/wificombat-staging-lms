export const normalizePath = (path: string) => {
  if (path?.endsWith("/")) {
    return path?.slice(0, -1);
  }
  return path;
};
