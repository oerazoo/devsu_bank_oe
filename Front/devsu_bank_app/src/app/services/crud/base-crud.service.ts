import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


export abstract class BaseCrudService<T> {

  protected apiUrl: string = environment.apiBaseUrl;


  protected constructor(
    protected http: HttpClient,
    protected endpoint: string
  ) {
    this.apiUrl += endpoint;
  }

  getAll( search ?: string ): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + (search ? `?search=${search}` : ''));
  }

  getAllResume(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + "/resume");
  }

  save(entity: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, entity);
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
