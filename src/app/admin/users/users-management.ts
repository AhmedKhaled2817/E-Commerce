import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserRole, UserStatus } from 'app/Shared/Models/user-profile';
import { UserManagementService } from 'app/Shared/Service/user-management.service';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User Management</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (user of (users$ | async); track user.email) {
          <tr>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role || 'customer' }}</td>
            <td>{{ user.status || 'active' }}</td>
            <td class="actions">
              <button type="button" (click)="toggleStatus(user.email, user.status || 'active')">
                {{ (user.status || 'active') === 'active' ? 'Ban' : 'Activate' }}
              </button>
              <button type="button" (click)="toggleRole(user.email, user.role || 'customer')">
                {{ (user.role || 'customer') === 'admin' ? 'Make Customer' : 'Make Admin' }}
              </button>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="5">No users available.</td></tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border-bottom: 1px solid #eee;
        padding: 8px;
      }
      .actions {
        display: flex;
        gap: 8px;
      }
    `,
  ],
})
export class UsersManagement {
  private userManagementService = inject(UserManagementService);
  users$ = this.userManagementService.users$;

  toggleStatus(email: string, currentStatus: UserStatus): void {
    this.userManagementService.setStatus(email, currentStatus === 'active' ? 'banned' : 'active');
  }

  toggleRole(email: string, currentRole: UserRole): void {
    this.userManagementService.setRole(email, currentRole === 'admin' ? 'customer' : 'admin');
  }
}
