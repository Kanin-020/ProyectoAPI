import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_URL = 'http://localhost:3000/task';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  addTask(name: string, description: string, status: string, creationDate: string, deadline: string) {
    const body = { name, description, status, creationDate, deadline };

    return this.http.post(`${this.API_URL}/add`, body);
  }

  getTaskList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getTaskById(taskId: number) {
    return this.http.get(`${this.API_URL}/get/${taskId}`);
  }

  editTask(taskId: number, name: string, description: string, status: string, creationDate: string, deadline: string) {

    const body = { name, description, status, creationDate, deadline };

    return this.http.put(`${this.API_URL}/edit/${taskId}`, body);

  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.API_URL}/delete/${taskId}`);
  }

}
