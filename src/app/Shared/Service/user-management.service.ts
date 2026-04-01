import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile, UserRole, UserStatus } from '../Models/user-profile';
import { AuditLogService } from './audit-log.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private readonly storageKey = 'registered_users';
  private readonly usersSubject = new BehaviorSubject<UserProfile[]>(this.loadUsers());
  users$ = this.usersSubject.asObservable();

  constructor(private auditLogService: AuditLogService) {}

  setStatus(email: string, status: UserStatus): void {
    this.updateUser(email, { status }, `set user ${status}`);
  }

  setRole(email: string, role: UserRole): void {
    this.updateUser(email, { role }, `changed role to ${role}`);
  }

  private updateUser(email: string, partial: Partial<UserProfile>, action: string): void {
    const users = this.usersSubject.value.map((user) => (user.email === email ? { ...user, ...partial } : user));
    this.persist(users);
    this.auditLogService.addLog({
      actor: 'Admin',
      action,
      entity: 'user',
      entityId: email,
    });
  }

  private persist(users: UserProfile[]): void {
    this.usersSubject.next(users);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  private loadUsers(): UserProfile[] {
    const stored = localStorage.getItem(this.storageKey);
    const users = stored ? (JSON.parse(stored) as UserProfile[]) : [];
    const adminSeed: UserProfile = {
      name: 'Admin',
      email: 'admin@shop.com',
      password: 'Admin@123456',
      avatar: null,
      isPrime: false,
      role: 'admin',
      status: 'active',
    };
    if (!users.some((user) => user.email === adminSeed.email)) {
      users.unshift(adminSeed);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
    return users;
  }
}
