
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Telephone {
  id: number;
  namaUser: string;
  alamat: string;
  noTelp: string;
  kodePost: string;
  dateTime: string;
}

export type TelephoneInput = Omit<Telephone, 'id' | 'dateTime'>;

@Injectable({
  providedIn: 'root'
})
export class TelephoneService {
  private readonly apiUrl = 'http://localhost:5046/api/Telephone';  

  constructor(private http: HttpClient) {}

  // READ: mengambil semua data
  getTelephones(): Observable<Telephone[]> {
    return this.http.get<Telephone[]>(this.apiUrl);
  }

  // CREATE: menambahkan data
  createTelephone(data: TelephoneInput): Observable<Telephone> {
    return this.http.post<Telephone>(this.apiUrl, data);
  }

  // UPDATE: mengubah data
  updateTelephone(id: number, data: Telephone): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE: menghapus data
  deleteTelephone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}