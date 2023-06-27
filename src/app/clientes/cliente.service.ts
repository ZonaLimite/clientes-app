import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json' })

  constructor(private http: HttpClient) { }
  /**
  * Retorna un observable de clientes
  */
  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  /**
  * Retorna un observable de cliente
  */
  create(cliente: Cliente): Observable<Cliente> {
  return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});

  }

  /**
  * Retorna un solo cliente
  */
   getCliente(id): Observable<Cliente>{
      return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
   }

  /**
  * Actualiza un cliente (id)
  **/
  update(cliente: Cliente) : Observable<Cliente>{
   return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers: this.httpHeaders})
  }
}