export const extractIdFromGid = (gid: string): string => {
  const parts = gid.split('/');
  return parts[parts.length - 1];
}