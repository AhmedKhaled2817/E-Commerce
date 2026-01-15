import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/Shared';   // @app/shared

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
  // private router=inject(Router);
  private location = inject(Location);

  form!: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendOTP(): void {
    if (this.form.valid) {
      // call the server
      console.log(this.form.value);
    }
  }

  backToLogin(): void {
    // this.router.navigate(['login']);
    this.location.back();
  }
}
