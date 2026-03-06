import usersData from '../mock-data/users.json';

export const login = async (credentials: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const user = usersData.find(u => u.email === credentials.email);
  if (user) return user;
  throw new Error('Invalid credentials');
};

export const signup = async (userData: any) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return { ...userData, id: Math.random().toString(36).substr(2, 9) };
};

export const getProfile = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return usersData.find(u => u.id === userId);
};
