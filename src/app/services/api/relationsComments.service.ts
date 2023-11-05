import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsCommentsService {

  private readonly API_URL = 'http://localhost:3000/relations-comments';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  addCommentRelation(commentId: number, taskId: number, userId: number) {

    const body = { commentId, taskId, userId };

    return this.http.post(`${this.API_URL}/add`, body);
  }

  getCommentRelationList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getCommentRelationById(relationCommentId: number) {
    return this.http.get(`${this.API_URL}/get/${relationCommentId}`);
  }

  getCommentRelationByCommentId(commentId: number) {
    return this.http.get(`${this.API_URL}/get/comment/${commentId}`);
  }

  getCommentRelationByTaskId(taskId: number) {
    return this.http.get(`${this.API_URL}/get/task/${taskId}`);
  }

  getCommentRelationByUserId(userId: number) {
    return this.http.get(`${this.API_URL}/get/user/${userId}`);
  }

  editCommentRelation(relationCommentId: number, commentId: number, taskId: number, userId: number) {

    const body = { commentId, taskId, userId };

    return this.http.put(`${this.API_URL}/edit/${relationCommentId}`, body);

  }

  deleteCommentRelation(relationCommentId: number) {
    return this.http.delete(`${this.API_URL}/delete/${relationCommentId}`);
  }


}
