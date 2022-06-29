import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PW_MIN_LENGTH, PW_REGEX } from '../../common/constants';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  hideA = true;
  hideB = true;
  pwMinLength = PW_MIN_LENGTH;
  signupForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(PW_MIN_LENGTH),
        Validators.pattern(PW_REGEX),
      ]),
      confirmPassword: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(PW_MIN_LENGTH),
        Validators.pattern(PW_REGEX),
      ]),
    });
  }

  onSubmit(): void {
    console.log('submited');
  }

  get email() {
    return this.signupForm.get('email') as FormControl<string>;
  }

  get password() {
    return this.signupForm.get('password') as FormControl<string>;
  }
}
