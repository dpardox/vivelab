import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: Number;
  user: Object;
  photo: Object;
  posts: Array<Object> = [];
  albums: Array<Object> = [];

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = params['id'];
        this.loadPhoto();
        this.loadUser();
        this.loadPosts();
        this.loadAlbums();
      }
    );
  }

  loadUser () {
    this.http.request(`https://jsonplaceholder.typicode.com/users/${this.id}`).subscribe(
      (user: Response) => {
        this.user = user.json();
      }
    );
  }

  loadPhoto () {
    this.http.request(`https://jsonplaceholder.typicode.com/users/${this.id}/albums`).subscribe(
      (albumns: Response) => {
        this.http.request(`https://jsonplaceholder.typicode.com/albums/${albumns.json()[0]['id']}/photos`).subscribe(
          (photos: Response) => {
            this.photo = photos.json()[0]['url'];
          }
        );
      }
    );
  }

  loadPosts () {
    this.http.request(`https://jsonplaceholder.typicode.com/users/${this.id}/posts`).subscribe(
      (posts: Response) => {
        posts.json().forEach(
          (post: object) => {
            this.http.request(`https://jsonplaceholder.typicode.com/post/${post['id']}/comments`).subscribe(
              (comments: Response) => {
                post['comments'] = comments.json();
                this.posts.push(post);
              }
            );
          }
        );
      }
    );
  }

  loadAlbums () {
    this.http.request(`https://jsonplaceholder.typicode.com/user/${this.id}/albums`).subscribe(
      (albums: Response) => {
        albums.json().forEach(
          (album: Object) => {
            this.http.request(`https://jsonplaceholder.typicode.com/album/${album['id']}/photos`).subscribe(
              (photos: Response) => {
                album['photos'] = photos.json();
                this.albums.push(album);
              }
            );
          }
        );
      }
    );
  }
}
