import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private userCredentials: firebase.auth.UserCredential;
  private authentication: Observable<boolean>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.authentication = new Observable(observer =>  {
      angularFireAuth
        .onAuthStateChanged((user) => {
          observer.next(!!user)
        })
    });
  }

  isUserAuthenticated() {
    return this.authentication;
  }

  async login(email: string, password: string): Promise<any> {
    await this.angularFireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    return this.userCredentials;
  }

  logout(): Promise<any> {
    return this.angularFireAuth.signOut();
  }
}
