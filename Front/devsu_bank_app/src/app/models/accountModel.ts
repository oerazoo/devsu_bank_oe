export interface Account {
  id: number;
  accountNumber: string;
  type: string;
  initialBalance: number;
  clientId?: number;
  status: boolean;
  clientName?: string;
}
