import { Tool, User } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // 至少8位，包含大小写字母、数字和特殊字符
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateUsername = (username: string): boolean => {
  // 3-20位字母、数字、下划线
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateUserData = (data: Partial<User>) => {
  const errors: string[] = [];

  if (!data.username || !validateUsername(data.username)) {
    errors.push('Username must be 3-20 characters long and contain only letters, numbers and underscores');
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Invalid email format');
  }
  if (!data.password || !validatePassword(data.password)) {
    errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, number and special character');
  }

  return errors;
};

export const validateToolData = (data: Partial<Tool>) => {
  const errors: string[] = [];

  if (!data.name?.trim() || data.name.length < 2 || data.name.length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  }
  if (!data.description?.trim() || data.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  if (!data.website_url || !validateUrl(data.website_url)) {
    errors.push('Valid website URL is required');
  }
  if (!data.category_id) {
    errors.push('Category is required');
  }
  if (data.tags && (!Array.isArray(data.tags) || data.tags.length === 0)) {
    errors.push('At least one tag is required');
  }

  return errors;
}; 