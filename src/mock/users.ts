import usersData from '../mock-data/users.json';

const mockUsers = [...usersData];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUsers = async () => {
  await delay(600);
  return [...mockUsers];
};

export const login = async (credentials: any) => {
  await delay(1000);
  const user = mockUsers.find((item) => item.email === credentials.email);
  if (user) return user;
  throw new Error('Invalid credentials');
};

export const signup = async (userData: any) => {
  await delay(1200);
  const user = { ...userData, id: Math.random().toString(36).slice(2, 11) };
  mockUsers.push(user);
  return user;
};

export const getProfile = async (userId: string) => {
  await delay(500);
  return mockUsers.find((item) => item.id === userId) || null;
};

export const updateUser = async (updatedUser: any) => {
  await delay(700);
  const index = mockUsers.findIndex((item) => item.id === updatedUser.id);
  if (index === -1) {
    throw new Error('User not found');
  }

  mockUsers[index] = { ...mockUsers[index], ...updatedUser };
  return mockUsers[index];
};
