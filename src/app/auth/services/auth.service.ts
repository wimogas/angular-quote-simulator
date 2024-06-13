import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

import {environment } from '../../../environments/environment'

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User|null>(null)

  userData: {
    email: string,
    password: string,
    returnSecureToken: boolean,
  } = {
    email: '',
    password: '',
    returnSecureToken: true,
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(email: string, password: string) {
    this.userData.email = email
    this.userData.password = password
    return this.http.post<AuthResponseData>(
      `${environment.firebaseAuthUrl}signUp?key=${environment.firebaseApiKey}`,
      this.userData
      ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuth(resData)
        }))
  }

  signIn(email: string, password: string) {
    this.userData.email = email
    this.userData.password = password
    return this.http.post<AuthResponseData>(
      `${environment.firebaseAuthUrl}signInWithPassword?key=${environment.firebaseApiKey}`,
      this.userData
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(resData)
      }))
  }

  logout() {
    this.user.next(null)
    localStorage.removeItem(`${environment.localStoreKey}`)
    this.router.navigate(['/auth'])
  }

  checkAuth() {
    const userData = localStorage.getItem(`${environment.localStoreKey}`)
    if (!userData) {
      return
    }
    const parsedUser = JSON.parse(userData)
    const newUser = new User(
      parsedUser.email,
      parsedUser.id,
      parsedUser._token,
      parsedUser._tokenExpirationDate
    )
    if(newUser.token) {
      this.user.next(newUser)
    }
  }

  private handleAuth(resData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate)
    this.user.next(user)
    localStorage.setItem(`${environment.localStoreKey}`, JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred'
    return throwError(() => new Error(errorMessage))
  }
}
