import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { } // creating instance

  getData(){
    return this.http.get('/tables'); // returns observables
  }
}
