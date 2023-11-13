import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsProjectsService {

  private readonly API_URL = 'http://localhost:3000/relations-projects';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  addProjectRelation(projectId: number, userId: number, taskId?: number) {

    const body = { projectId, taskId, userId };

    return this.http.post(`${this.API_URL}/add`, body);
  }

  getProjectRelationList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getProjectRelationById(relationProjectId: number) {
    return this.http.get(`${this.API_URL}/get/${relationProjectId}`);
  }

  getProjectRelationByProjectId(projectId: number) {
    return this.http.get(`${this.API_URL}/get/project/${projectId}`);
  }

  getProjectRelationByTaskId(taskId: number) {
    return this.http.get(`${this.API_URL}/get/task/${taskId}`);
  }

  getProjectRelationByUserId(userId: number) {
    return this.http.get(`${this.API_URL}/get/user/${userId}`);
  }

  editProjectRelation(relationProjectId: number, projectId: number, taskId: number, userId: number) {

    const body = { projectId, taskId, userId };

    return this.http.put(`${this.API_URL}/edit/${relationProjectId}`, body);

  }

  deleteProjectRelation(relationProjectId: number) {
    return this.http.delete(`${this.API_URL}/delete/${relationProjectId}`);
  }

}
