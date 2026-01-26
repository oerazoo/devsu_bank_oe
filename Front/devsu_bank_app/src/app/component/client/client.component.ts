import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Client } from '../../models/clientModel';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];

  clientForm : FormGroup;

  showDialog: boolean = false;
  isEditing: boolean = false;
  searchTerm: any;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ){
    this.clientForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: [''],
      password: [''],
      age: [''],
    });
  }


  onSearch(): void {

    this.clientService.getAllClients(this.searchTerm).subscribe(clients => {
      this.clients = clients;
    });

  }

  ngOnInit(): void {
    this.getClients();

  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
    // Implement logic to fetch clients from the service
  }

  onDeleteClient(clientId: number): void {
    this.clientService.delete(clientId).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== clientId);
    });
  }

  saveClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const newClient: Client = this.clientForm.value;
    this.clientService.save(newClient).subscribe(savedClient => {
      this.clients.push(savedClient);
      this.clientForm.reset();
      this.showDialog = false;
    });
  }

  onEditing(client: Client): void {
    this.isEditing = true;
    this.showDialog = true;
    this.clientForm.patchValue({
      id: client.id,
      name: client.name,
      identification: client.identification,
      address: client.address,
      phoneNumber: client.phoneNumber,
      password: client.password,
      age: client.age,
    });
  }

  updateClient(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    console.log(this.clientForm.value);


    const client: Client = this.clientForm.value;
    this.clientService.update(client).subscribe(updatedClient => {
      this.getClients();
      this.clientForm.reset();
      this.showDialog = false;
      this.isEditing = false;
    });
  }

  onCloseDialog(): void {
    this.isEditing = false;
    this.showDialog = false;
    this.clientForm.reset();
  }

}
