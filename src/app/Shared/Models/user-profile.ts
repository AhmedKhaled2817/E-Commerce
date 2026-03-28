export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  avatar: string | null;
  isPrime: boolean;
  memberSince?: string;
  totalOrders?: number;
}
