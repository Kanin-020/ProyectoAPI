import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = 'http://localhost:3000/project';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  addProject(name: string, description: string, status: string, creationDate: string, deadline: string) {
    const body = { name, description, status, creationDate, deadline };

    return this.http.post(`${this.API_URL}/add`, body);
  }

  getProjectList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getProjectById(projectId: number) {
    return this.http.get(`${this.API_URL}/get/${projectId}`);
  }

  editProject(projectId: number, name: string, description: string, status: string, creationDate: string, deadline: string) {

    const body = { name, description, status, creationDate, deadline };

    return this.http.put(`${this.API_URL}/edit/${projectId}`, body);

  }

  deleteProject(projectId: number) {
    return this.http.delete(`${this.API_URL}/delete/${projectId}`);
  }

}
