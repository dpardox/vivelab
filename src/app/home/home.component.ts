import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: Array<Object> = [];

  constructor( private http: Http ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers () {
    this.http.request('https://jsonplaceholder.typicode.com/users').subscribe(
      (users: Response) => {
        users.json().forEach((user: Array<Object>) => {
          this.http.request(`https://jsonplaceholder.typicode.com/users/${user['id']}/albums`).subscribe(
            (albumns: Response) => {
              this.http.request(`https://jsonplaceholder.typicode.com/albums/${albumns.json()[0]['id']}/photos`).subscribe(
                (photos: Response) => {
                  user['photoUrl'] = photos.json()[0]['url'];
                  this.users.push(user);
                }
              );
            }
          );
        });
      }
    );
  }
}
