import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly API_URL = 'http://localhost:3000/comment';
  private readonly TOKEN = localStorage.getItem('token') || '';

  constructor(private readonly http: HttpClient) { }

  addComment(status: string, content: string, date: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { status, content, date };

    return this.http.post(`${this.API_URL}/add`, body, { headers });
  }

  getCommentList() {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get-all`, { headers });
  }

  getCommentById(commentId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.get(`${this.API_URL}/get/${commentId}`, { headers });
  }

  editComment(commentId: number, status: string, content: string) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    const body = { status, content };

    return this.http.put(`${this.API_URL}/edit/${commentId}`, body, { headers });

  }

  deleteComment(commentId: number) {

    const headers = new HttpHeaders({
      'Authorization': this.TOKEN,
    });

    return this.http.delete(`${this.API_URL}/delete/${commentId}`, { headers });
  }

}
