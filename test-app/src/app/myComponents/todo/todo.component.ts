import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
declare var bootstrap: any;


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  isLoggedIn: any = false

  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
