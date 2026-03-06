import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import usersData from '@/mock-data/users.json';

export type UserRole = 'user' | 'organizer';

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar_url?: string;
  organizer_id?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

const initialUsers = usersData as UserType[];

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserType | null>(null);
  const users = ref<UserType[]>([...initialUsers]);

  const isLoggedIn = computed(() => currentUser.value !== null);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    const matchedUser = users.value.find(
      (user) => user.email.toLowerCase() === email.toLowerCase().trim() && user.password === password
    );

    if (!matchedUser) {
      return { success: false, error: 'auth.invalid_credentials' };
    }

    currentUser.value = matchedUser;
    return { success: true };
  };

  const logout = (): void => {
    currentUser.value = null;
    void router.push('/');
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<LoginResult> => {
    const newUser: UserType = {
      id: String(users.value.length + 1),
      name,
      email,
      password,
      role,
      avatar_url: 'https://i.pravatar.cc/150?img=12',
    };

    users.value.push(newUser);
    currentUser.value = newUser;
    await router.push('/');

    return { success: true };
  };

  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
    register,
  };
});
