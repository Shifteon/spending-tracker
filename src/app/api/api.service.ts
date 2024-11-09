import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getTestMessage() {
    return this.http.get('/api/test');
  }

  testAuth() {
    const body = {
        "password": "testPassword"
    };
    return this.http.post('/api/auth', body);
  }
}