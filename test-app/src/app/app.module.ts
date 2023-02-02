import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './myComponents/todo/todo.component';
import { LoginPageComponent } from './myComponents/login-page/login-page.component';
import { SignupPageComponent } from './myComponents/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './myComponents/page-not-found/page-not-found.component';
import { HomepageComponent } from './myComponents/homepage/homepage.component';
import { AuthGuard } from './shared/auth.guard';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginPageComponent,
    SignupPageComponent,
    PageNotFoundComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginPageComponent,title: "Login"},
      {path: 'signup', component: SignupPageComponent,title: "Signup"},
      {path: 'homepage', component: HomepageComponent,title: "Homepage", canActivate:[AuthGuard]},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
