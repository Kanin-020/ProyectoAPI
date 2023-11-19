import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_URL = 'http://localhost:3000/task';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  addTask(name: string, description: string, status: string, creationDate: string, deadline: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, status, creationDate, deadline };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getTaskList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getTaskById(taskId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${taskId}`, { headers });
  }

  editTask(taskId: number, name: string, description: string, status: string, creationDate: string, deadline: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, status, creationDate, deadline };

    return this.http.put(`${this.API_URL}/edit/${taskId}`, body, { headers });

  }

  deleteTask(taskId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${taskId}`, { headers });
  }

}
