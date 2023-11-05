import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API_URL = 'http://localhost:3000/comment';
  private readonly TOKEN = localStorage.getItem('token');
  private readonly SECRET_KEY = localStorage.getItem('secretKey');

  constructor(private readonly http: HttpClient) { }

  addComment(status: string, content: string, date: string) {
    const body = { status, content, date };

    return this.http.post(`${this.API_URL}/add`, body);
  }

  getCommentList() {
    return this.http.get(`${this.API_URL}/get-all`);
  }

  getCommentById(commentId: number) {
    return this.http.get(`${this.API_URL}/get/${commentId}`);
  }

  editComment(commentId: number, status: string, content: string) {

    const body = { status, content };

    return this.http.put(`${this.API_URL}/edit/${commentId}`, body);

  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.API_URL}/delete/${commentId}`);
  }

}
