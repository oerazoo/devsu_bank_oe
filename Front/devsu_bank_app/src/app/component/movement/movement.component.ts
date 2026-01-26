import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Movement } from '../../models/movementModel';
import { MovementService } from '../../services/movement/movement.service';
import { ClientService } from '../../services/client/client.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from '../../services/account/account.service';
import { NewMovement } from '../../models/newMovementModel';

@Component({
  selector: 'app-movement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './movement.component.html',
  styleUrl: './movement.component.scss',
})
export class MovementComponent {
  movements: Movement[] = [];
  clients: any[] = [];

  movementForm: FormGroup;

  showDialog: boolean = false;
  isEditing: boolean = false;
  searchTerm: any;
  isWrongMovement: boolean = false;

  constructor(
    private movementService: MovementService,
    private clientService: ClientService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {
    this.movementForm = this.formBuilder.group({
      id: [null],
      kind: ['', Validators.required],
      balance: ['', Validators.required],
      initialBalance: [null, { disabled: true }],
      value: [0, Validators.required],
      accountNumber: [null, Validators.required],
      status: [true],
    });
  }

  onSearch(): void {
    this.movementService.getAll(this.searchTerm).subscribe((acounts) => {
      this.movements = acounts;
    });
  }

  ngOnInit(): void {
    this.getMovements();
      this.listenFormChanges();
    //this.getClientsList();
  }

  private listenFormChanges() {
  this.movementForm.valueChanges.subscribe(() => {
    this.calculateBalance();
  });
}

private calculateBalance() {
  const initialBalance = this.movementForm.get('initialBalance')?.value ?? 0;
  const kind = this.movementForm.get('kind')?.value;
  const value = this.movementForm.get('value')?.value ?? 0;

  if (!kind || !value) {
    this.movementForm.get('balance')?.setValue(initialBalance, { emitEvent: false });
    return;
  }

  const result =
    kind === 'DEPOSITO'
      ? initialBalance + value
      : initialBalance - value;

  this.movementForm.get('balance')?.setValue(result, { emitEvent: false });
}


  getMovements(): void {
    this.movementService.getAll().subscribe((acounts) => {
      this.movements = acounts;
    });
  }

  onDelete(movementId: number): void {
    this.movementService.delete(movementId).subscribe(() => {
      this.movements = this.movements.filter(
        (movement) => movement.id !== movementId,
      );
    });
  }

  save(): void {
    if (this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    const newMovement: NewMovement = this.movementForm.value;
    this.movementService.save(newMovement).subscribe((savedMovement) => {
      this.movements.push(savedMovement);
      this.movementForm.reset();
      this.showDialog = false;
    });
  }

  onEditing(movement: Movement): void {
    this.isEditing = true;
    this.showDialog = true;
    this.movementForm.patchValue({
      id: movement.id,
    });
  }

  update(): void {
    if (this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    console.log(this.movementForm.value);

    const movement: Movement = this.movementForm.value;
    this.movementService.update(movement?.id, movement).subscribe(() => {
      this.getMovements();
      this.movementForm.reset();
      this.showDialog = false;
      this.isEditing = false;
    });
  }

  onCloseDialog(): void {
    this.isEditing = false;
    this.showDialog = false;
    this.movementForm.reset();
  }

  searchAccount(){
    const accountNumber = this.movementForm.get('accountNumber')?.value;
    console.log(accountNumber);

    if(accountNumber){
      this.accountService.getByAccountNumber(accountNumber).subscribe((account) => {
        this.movementForm.patchValue({
          initialBalance: account.initialBalance
        });
      });
    }
  }
}
