import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsProjectsService {

  private readonly API_URL = 'http://localhost:3000/relations-projects';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  addProjectRelation(projectId: number, userId: number, taskId?: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });
    const body = { projectId, taskId, userId };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getProjectRelationList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getProjectRelationById(relationProjectId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${relationProjectId}`, { headers });
  }

  getProjectRelationByProjectId(projectId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/project/${projectId}`, { headers });
  }

  getProjectRelationByTaskId(taskId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/task/${taskId}`, { headers });
  }

  getProjectRelationByUserId(userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/user/${userId}`, { headers });
  }

  editProjectRelation(relationProjectId: number, projectId: number, taskId: number, userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { projectId, taskId, userId };

    return this.http.put(`${this.API_URL}/edit/${relationProjectId}`, body, { headers });

  }

  deleteProjectRelation(relationProjectId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${relationProjectId}`, { headers });
  }

}
