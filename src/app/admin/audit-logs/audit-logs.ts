import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuditLogService } from 'app/Shared/Service/audit-log.service';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Audit Logs</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Actor</th>
          <th>Action</th>
          <th>Entity</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        @for (log of (logs$ | async); track log.id) {
          <tr>
            <td>{{ log.timestamp }}</td>
            <td>{{ log.actor }}</td>
            <td>{{ log.action }}</td>
            <td>{{ log.entity }}</td>
            <td>{{ log.entityId }}</td>
          </tr>
        } @empty {
          <tr><td colspan="5">No logs yet.</td></tr>
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
        text-align: left;
      }
    `,
  ],
})
export class AuditLogs {
  private auditLogService = inject(AuditLogService);
  logs$ = this.auditLogService.logs$;
}
