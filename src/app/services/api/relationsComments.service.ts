import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsCommentsService {

  private readonly API_URL = 'http://localhost:3000/relations-comments';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  addCommentRelation(commentId: number, taskId: number, userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { commentId, taskId, userId };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getCommentRelationList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getCommentRelationById(relationCommentId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${relationCommentId}`, { headers });
  }

  getCommentRelationByCommentId(commentId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/comment/${commentId}`, { headers });
  }

  getCommentRelationByTaskId(taskId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/task/${taskId}`, { headers });
  }

  getCommentRelationByUserId(userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/user/${userId}`, { headers });
  }

  editCommentRelation(relationCommentId: number, commentId: number, taskId: number, userId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { commentId, taskId, userId };

    return this.http.put(`${this.API_URL}/edit/${relationCommentId}`, body, { headers });

  }

  deleteCommentRelation(relationCommentId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${relationCommentId}`, { headers });
  }


}
