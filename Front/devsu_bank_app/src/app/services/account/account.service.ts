import { Injectable } from '@angular/core';
import { BaseCrudService } from '../crud/base-crud.service';
import { Account } from '../../models/accountModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseCrudService<Account> {
  constructor(http: HttpClient) {
    super(http, '/accounts');
  }

  getByAccountNumber(accountNumber: string) {
    return this.http.get<any>(`${this.apiUrl}/accountNumber/${accountNumber}`);
  }
}
