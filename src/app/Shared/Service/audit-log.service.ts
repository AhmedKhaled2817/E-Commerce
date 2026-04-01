import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuditLog } from '../Models/audit-log';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  private readonly storageKey = 'audit_logs';
  private readonly logsSubject = new BehaviorSubject<AuditLog[]>(this.loadLogs());
  logs$ = this.logsSubject.asObservable();

  addLog(log: Omit<AuditLog, 'id' | 'timestamp'>): void {
    const nextLog: AuditLog = {
      ...log,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    const updated = [nextLog, ...this.logsSubject.value];
    this.logsSubject.next(updated);
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  private loadLogs(): AuditLog[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? (JSON.parse(stored) as AuditLog[]) : [];
  }
}
