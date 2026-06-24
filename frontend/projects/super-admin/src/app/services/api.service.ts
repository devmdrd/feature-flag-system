import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const BASE_URL = "http://localhost:3000/api";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  private headers(token?: string | null): HttpHeaders {
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  get<T>(path: string, token?: string | null): Observable<T> {
    return this.http.get<T>(`${BASE_URL}${path}`, {
      headers: this.headers(token),
    });
  }

  post<T>(path: string, body: unknown, token?: string | null): Observable<T> {
    return this.http.post<T>(`${BASE_URL}${path}`, body, {
      headers: this.headers(token),
    });
  }

}
