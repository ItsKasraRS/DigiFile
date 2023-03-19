import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

constructor(private http: HttpClient) { }

getProductComments(id: number): Observable<any> {
  return this.http.get('comment/get-product-comments/' + id);
}
addComment(id: number, model: any): Observable<any> {
  return this.http.post('comment/add-comment/' + id, model);
}

}
