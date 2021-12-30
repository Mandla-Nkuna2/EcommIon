import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  constructor(private afauth: AngularFireAuth) {}

  isLoggedin() {
    const authState = this.afauth.authState;
    authState.subscribe((user) => {
      if (!user) {
        this.isAuthenticated.next(false);
      } else {
        this.isAuthenticated.next(true);
      }
    });
  }

  async login(creds: { email: string; password: string }) {
    this.afauth
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((res) => {
        this.isAuthenticated.next(true);
        console.log(res);
      })
      .catch((err) => {
        this.isAuthenticated.next(false);
        alert(err);
      });
  }

  logout() {
    this.afauth.signOut();
    this.isAuthenticated.next(false);
  }
}
