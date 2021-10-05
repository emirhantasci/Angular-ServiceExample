import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getSafePropertyAccessString } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url="https://jsonplaceholder.typicode.com/posts"

  constructor(private http:HttpClient) { }

  getPosts():any{
    return this.http.get(this.url).pipe(
      retry(3), //3 kere request gönderir. 3 kere de başarısız olursa catcherror çalışır.
      catchError(this.handleError)
    );
    
  }

  createPost(post: { title: string; }){
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(post: { title?: string; id?: any; }){
    return this.http.put(this.url+'/'+post.id, JSON.stringify(post))
  }
  
  deletePost(post: { id: string; }){
    return this.http.delete(this.url+'/'+post.id).pipe(
      retry(3), //3 kere request gönderir. 3 kere de başarısız olursa catcherror çalışır.
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //client error
      console.log("client error "+error.error.message);
    }else{
      //backend error
      console.log(`backend error: status code: ${error.status} error:${error.error}`);
    }
    return throwError('Bilinmeyen bir hata oluştu.')
  }
}
