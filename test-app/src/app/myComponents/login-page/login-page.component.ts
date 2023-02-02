import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { patterns } from 'src/app/input.validator';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm!: FormGroup;
  submitted = false;
  userExists = true;
  resData: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(patterns.email_regex)]],
      password: ['', [Validators.required]],

    })
  }

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    } else {
      let data = this.loginForm.value;

      this.http.post<Response>("http://localhost:3000/login", data).subscribe((res) => {
        this.resData = res

        localStorage.setItem('token', this.resData.accessToken)

        if (this.resData.code) {
          // alert("Login Successful")
          this.userExists = true;
          this.router.navigate(["/homepage"])
        }else{
          this.userExists = false
        }
      }, (error) => {
        console.log(error);
        
      })
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
