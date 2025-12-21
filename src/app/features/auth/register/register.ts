import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/services';               // @app/services
import { SharedModule } from '@app/Shared';                      // @app/shared

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

  ngOnInit(): void {
    this.initForm();
  }

  signUp(): void {
    if (this.form.valid) {
      console.log(this.form.value);
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
      }
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
