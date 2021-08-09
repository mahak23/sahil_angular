import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
export interface LoginContext {
  email: string;
  password: string;
}
export interface SignUpContext {
  email: string;
  password: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})


export class CommonService {

  constructor(private httpClient: HttpClient) { }

  login(context: LoginContext) {
    console.log(context)
    return this.httpClient.post('http://nodeagend.agendeisaude.com.br:8080/userapi/admin/signIn', context).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  signUp(context: SignUpContext) {
    console.log(context)
    return this.httpClient.post('http://nodeagend.agendeisaude.com.br:8080/userapi/admin/register', context).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }

  getUserList(conditions: any): Observable<any> {
    let searchConditions = "";
    if (conditions) {
      searchConditions = "?" + conditions;
    }
    return this.httpClient.get('http://nodeagend.agendeisaude.com.br:8080/userapi/admin/get_doctor_listing' + searchConditions).pipe(
      map((response: any) => {
        return response;
      }),
    );
  }
  updateStatus(data: any) {
    return this.httpClient.put('http://nodeagend.agendeisaude.com.br:8080/userapi/admin/doctor_status', data).pipe(
      map((response: any) => {
        return response;
      }),
    );

  }

}
