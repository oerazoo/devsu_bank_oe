import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/clientModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/clients';

  constructor(
    private http: HttpClient
  ) { }

  getAllClients( search ?: string ): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + (search ? `?search=${search}` : ''));
  }
  getAllClientsResume() : Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + "/resume");
  }

  save(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  update(client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  delete(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}`);
  }
}
