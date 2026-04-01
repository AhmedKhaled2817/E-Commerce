export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  avatar: string | null;
  isPrime: boolean;
  memberSince?: string;
  totalOrders?: number;
  role?: UserRole;
  status?: UserStatus;
}

export type UserRole = 'admin' | 'customer';
export type UserStatus = 'active' | 'banned';
