import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: [any] | undefined;
  error: any;
  private url="https://jsonplaceholder.typicode.com/posts"
  constructor(private postService: PostService) 
  {  }

  ngOnInit(): void {
    this.postService.getPosts()
    .subscribe((response: [any])=>{
      this.posts=<[any]>response;
    }, (error: any)=>this.error=error)
  }

  createPost(input:HTMLInputElement){
    const post = {title: input.value}
    input.value='';
    this.postService.createPost(post).subscribe(response=>{
      //post['id']=response['id'];
      this.posts?.splice(0,0,post);
    }, error=>this.error=error)
  }

  updatePost(post: { title: string; } | null | undefined){
    if(post!=null){
      post.title='updated';
      this.postService.updatePost(post).subscribe(response=>{
        console.log(response);
      }, error=>this.error=error);
    }
  }

  deletePost(post: any){
    this.postService.deletePost(post).subscribe(response=>{
      console.log(response);
      let index=this.posts?.indexOf(post);
      this.posts?.splice(index!,1);
    }, error=>this.error=error)
  }
}
