export interface Movement {
  id: number;
  kind: string;
  balance?: number;
  initialBalance?: number;
  status?: string;
  value: number;
  date: string;
  accountId?: number;
  clientId?: number;
  accountNumber?: string;
}
