import { Injectable } from '@angular/core';
import { BaseCrudService } from '../crud/base-crud.service';
import { Movement } from '../../models/movementModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { NewMovement } from '../../models/newMovementModel';

@Injectable({
  providedIn: 'root',
})
export class MovementService  {



    protected apiUrl: string = environment.apiBaseUrl + "/movements";


    protected constructor(
      protected http: HttpClient,
    ) {
    }

    getAll( search ?: string ): Observable<Movement[]> {
      return this.http.get<Movement[]>(this.apiUrl + (search ? `?search=${search}` : ''));
    }

    getAllResume(): Observable<Movement[]> {
      return this.http.get<Movement[]>(this.apiUrl + "/resume");
    }

    save(entity: NewMovement): Observable<Movement> {
      return this.http.post<Movement>(this.apiUrl, entity);
    }

    update(id: number, entity: Movement): Observable<Movement> {
      return this.http.patch<Movement>(`${this.apiUrl}/${id}`, entity);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
