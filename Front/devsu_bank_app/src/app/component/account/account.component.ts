import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../../models/accountModel';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Client } from '../../models/clientModel';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  accounts: Account[] = [];
  clients: any[] = [];

  accountForm: FormGroup;

  showDialog: boolean = false;
  isEditing: boolean = false;
  searchTerm: any;

  constructor(
    private accountService: AccountService,
    private clientService : ClientService,
    private formBuilder: FormBuilder,
  ) {
    this.accountForm = this.formBuilder.group({
      id: [null],
      accountNumber: ['', Validators.required],
      type: ['', Validators.required],
      initialBalance: [0, Validators.required],
      clientId: [null, Validators.required],
      status: [true],
    });
  }

  onSearch(): void {

      this.accountService.getAll(this.searchTerm).subscribe(acounts => {
        this.accounts = acounts;
      });

    }

    ngOnInit(): void {
      this.getAccounts();
      this.getClientsList();

    }

    getAccounts(): void {
      this.accountService.getAll().subscribe(acounts => {
        this.accounts = acounts;
      });
      // Implement logic to fetch acounts from the service
    }

    getClientsList(): void {
      this.clientService.getAllClientsResume().subscribe(clients => {
        this.clients = clients;
      });
    }

    onDelete(accountId: number): void {
      this.accountService.delete(accountId).subscribe(() => {
        this.accounts = this.accounts.filter(account => account.id !== accountId);
      });
    }

    save(): void {
      if (this.accountForm.invalid) {
        this.accountForm.markAllAsTouched();
        return;
      }



      let newAccount: Account = this.accountForm.value;
      this.accountService.save(newAccount).subscribe(savedAccount => {
        this.accounts.push(savedAccount);
        this.accountForm.reset();
        this.showDialog = false;
      });
    }

    onEditing(account: Account): void {
      this.isEditing = true;
      this.showDialog = true;
      this.accountForm.patchValue({
        id: account.id,
        accountNumber: account.accountNumber,
        type: account.type,
        initialBalance: account.initialBalance,
        status: account.status,
        clientId: account.clientId,
      });
    }

    update(): void {
      if (this.accountForm.invalid) {
        this.accountForm.markAllAsTouched();
        return;
      }

      console.log(this.accountForm.value);


      const account: Account = this.accountForm.value;
      this.accountService.update(account?.id, account).subscribe(() => {
        this.getAccounts();
        this.accountForm.reset();
        this.showDialog = false;
        this.isEditing = false;
      });
    }

    onCloseDialog(): void {
      this.isEditing = false;
      this.showDialog = false;
      this.accountForm.reset();
    }


}
