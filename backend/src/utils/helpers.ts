export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // 替换空格为 -
    .replace(/[^\w\-]+/g, '') // 移除非单词字符
    .replace(/\-\-+/g, '-')   // 替换多个 - 为单个 -
    .replace(/^-+/, '')       // 去掉开头的 -
    .replace(/-+$/, '');      // 去掉结尾的 -
};

export const generateRandomString = (length: number): string => {
  return Math.random().toString(36).substring(2, length + 2);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}; 