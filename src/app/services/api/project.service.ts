import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly API_URL = 'http://localhost:3000/project';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  addProject(name: string, description: string, status: string, creationDate: string, deadline: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, status, creationDate, deadline };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getProjectList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getProjectById(projectId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${projectId}`, { headers });
  }

  editProject(projectId: number, name: string, description: string, status: string, creationDate: string, deadline: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { name, description, status, creationDate, deadline };

    return this.http.put(`${this.API_URL}/edit/${projectId}`, body, { headers });

  }

  deleteProject(projectId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${projectId}`, { headers });
  }

}
