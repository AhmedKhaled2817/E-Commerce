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

      const seededAdmin = {
        name: 'Admin',
        email: 'admin@shop.com',
        password: 'Admin@123456',
        avatar: null,
        isPrime: false,
        role: 'admin',
        status: 'active',
      };
      const users = JSON.parse(this.localStorage.getItem('registered_users') ?? '[]') as any[];
      const allUsers = users.some((user) => user.email === seededAdmin.email)
        ? users
        : [seededAdmin, ...users];
      this.localStorage.setItem('registered_users', JSON.stringify(allUsers));

      const userData = allUsers.find((user) => user.email === email && user.password === password);
      if (!userData) {
        this.toastr.error('Invalid email or password');
        return;
      }
      if (userData.status === 'banned') {
        this.toastr.error('Your account is banned. Contact support.');
        return;
      }

      // Success! Save to profile service with token
      const { password: _, ...profileData } = userData; // Remove password from profile
      this.profileService.login(profileData as UserProfile);

      this.toastr.success('Welcome back!');
      if (profileData.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/public/profile']);
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
