import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  User,
} from '@angular/fire/auth';

// export interface User {
//   uid: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
//   emailVerified: boolean;
// }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user!: User | null;
  userSubscription!: any;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        this.user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  getUserProfileInfo() {
    if (this.user !== null) {
      // The this.user object has basic properties such as display name, email, etc.
      const displayName = this.user.displayName;
      const email = this.user.email;
      const photoURL = this.user.photoURL;
      const emailVerified = this.user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = this.user.uid;
    }
  }

  getUserProfileInfo2() {
    if (this.user !== null) {
      this.user.providerData.forEach((profile) => {
        console.log('Sign-in provider: ' + profile.providerId);
        console.log('  Provider-specific UID: ' + profile.uid);
        console.log('  Name: ' + profile.displayName);
        console.log('  Email: ' + profile.email);
        console.log('  Photo URL: ' + profile.photoURL);
      });
    }
  }

  changeEmail(email: string) {
    if (this.user !== null) {
      updateEmail(this.user, email)
        .then(() => {
          // Email updated!
        })
        .catch((error) => {
          // An error occurred
        });
    }
  }

  changePassword() {
    if (this.user?.email) {
      sendPasswordResetEmail(this.auth, this.user.email)
        .then(() => {
          // Password reset email sent!
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  private reauthenicate() {
    /*
    //TODO : promtforcredentials
    const crendential = 
    reauthenticateWithCredential(this.user, ).then(() => {
        // User re-authenticated.
      }).catch((error) => {
        // An error ocurred
      });
    */
  }

  //   sendEmailVerification(auth.currentUser)
  //   .then(() => {
  //     // Email verification sent!
  //     // ...
  //   });
}
