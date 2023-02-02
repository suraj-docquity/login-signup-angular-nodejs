import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { patterns } from 'src/app/input.validator';
import { __values } from 'tslib';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  registerForm!: FormGroup;
  submitted = false;

  response: any
  message: any
  isRegistered: any

  constructor(private fromBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fromBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(patterns.phone_regex)]],
      email: ['', [Validators.required, Validators.pattern(patterns.email_regex)]],
      password: ['', [Validators.required, Validators.pattern(patterns.pass_regex)]],

    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return
    } else {
      let data = this.registerForm.value;
      this.http.post("http://localhost:3000/signup", data).subscribe((res) => {

        this.response = res
        console.log(this.response)
        this.message = this.response.Message

        if (this.response.userExists) {
          this.isRegistered = true
        } else {
          this.router.navigate(["/login"])
          // alert(this.message)
        }

      }, (error) => {
        console.log(error);
      })
    }

  }

  get form(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

}
