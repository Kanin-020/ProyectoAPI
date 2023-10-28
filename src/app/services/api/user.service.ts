import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:3000/user';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  registerUser(name: string, email: string, password: string, role: string) {
    const body = { name, email, password, role };

    return this.http.post(`${this.API_URL}/register`, body);
  }

  login(email: string, password: string) {
    const body = { email, password };

    return this.http.post(`${this.API_URL}/login`, body);
  }

  getUsersList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getWorkersList() {
    return this.http.get(`${this.API_URL}/get-workers`);
  }

  getAdministratorsList() {
    return this.http.get(`${this.API_URL}/get-administrators`);
  }

  getUserById(userId: number) {
    return this.http.get(`${this.API_URL}/get/${userId}`);
  }

  editUser(userId: number, name: string, email: string, password: string, rol: string) {

    const body = { name, email, password, rol };

    return this.http.put(`${this.API_URL}/edit/${userId}`, body);

  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.API_URL}/delete/${userId}`);
  }




}
