import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/services';
import { SharedModule } from '@app/Shared';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../Shared/Service/local-storage';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  form!: FormGroup;

  isPassword = signal({
    password: false,
    confirmPassword: false,
  });

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly localStorage = inject(LocalStorage);

  ngOnInit(): void {
    this.initForm();
  }

  signUp(): void {
    if (this.form.valid) {
      const { firstName, lastName, email, password } = this.form.value;
      const userData = {
        name: `${firstName} ${lastName}`,
        email,
        password, // In a real app, this should be encrypted
        avatar: null,
        isPrime: false,
      };

      // Save to temporary storage for registration (mocking a database)
      this.localStorage.setItem('registered_user', JSON.stringify(userData) as string);

      // Redirect to login
      this.router.navigate(['/public/auth/login']);
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        acceptTerms: ['', [Validators.requiredTrue]],
      },
      {
        validators: ValidationService.mustMatch('password', 'confirmPassword'),
      },
    );
  }

  togglePasswordVisible(control: 'password' | 'confirmPassword'): void {
    this.isPassword.update((val) => {
      return {
        ...val,
        [control]: !val[control],
      };
    });
  }
}
