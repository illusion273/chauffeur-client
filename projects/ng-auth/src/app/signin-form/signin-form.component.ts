import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PW_MIN_LENGTH, PW_REGEX } from '../common/constants';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
})
export class SigninFormComponent implements OnInit {
  hide = true;
  signinForm!: FormGroup;

  constructor(private _snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup(
      {
        email: new FormControl<string>('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(PW_MIN_LENGTH),
          Validators.pattern(PW_REGEX),
        ]),
      },
      { updateOn: 'submit' }
    );
  }

  onSubmit(): void {
    console.log('submited');
    if (this.signinForm.invalid) {
      this._snackbar.open('Username and password do not match', 'Hide', {
        duration: 2000,
      });
    }
  }
}
