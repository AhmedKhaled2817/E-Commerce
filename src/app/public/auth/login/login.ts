import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '@app/Shared';
import { LocalStorage } from '../../../Shared/Service/local-storage';
import { ProfileService } from '../../../Shared/Service/profile.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfile } from '../../../Shared/Models/user-profile';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private localStorage = inject(LocalStorage);
  private profileService = inject(ProfileService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.initForm();
  }

  signIn(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      // Check for registered user
      const storedUser = this.localStorage.getItem('registered_user') as string;

      if (storedUser) {
        const userData = JSON.parse(storedUser);

        if (userData.email === email && userData.password === password) {
          // Success! Save to profile service
          const { password: _, ...profileData } = userData; // Remove password from profile
          this.profileService.updateProfile(profileData as UserProfile);

          this.toastr.success('Welcome back!');
          this.router.navigate(['/public/profile']);
        } else {
          this.toastr.error('Invalid email or password');
        }
      } else {
        this.toastr.error('No user found. Please register first.');
      }
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  navigateToPage(url: string): void {
    this.router.navigateByUrl(url);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/1200x800';
  }
}
