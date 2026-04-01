export interface AuditLog {
  id: number;
  actor: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details?: string;
}
