import { Injectable, signal, inject } from '@angular/core';
import { LocalStorage } from './local-storage';
import { UserProfile } from '../Models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly STORAGE_KEY = 'user_profile_data';
  private readonly AUTH_KEY = 'is_logged_in';
  private localStorage = inject(LocalStorage);

  // Using signals for reactive state
  userProfile = signal<UserProfile>(this.getDefaultProfile());
  isLoggedIn = signal<boolean>(this.checkInitialLoginStatus());

  constructor() {
    this.userProfile.set(this.loadProfile());
  }

  private checkInitialLoginStatus(): boolean {
    return this.localStorage.getItem(this.AUTH_KEY) === 'true';
  }

  private getDefaultProfile(): UserProfile {
    return {
      name: 'Guest',
      email: '',
      avatar: null,
      isPrime: false,
    };
  }

  private loadProfile(): UserProfile {
    const data = this.localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data as string);
      } catch (e) {
        console.error('Error parsing profile data', e);
      }
    }
    return this.getDefaultProfile();
  }

  updateProfile(profile: UserProfile) {
    this.userProfile.set(profile);
    this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));

    // Set logged in if profile is not Guest
    if (profile.name !== 'Guest') {
      this.setLoginStatus(true);
    }
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn.set(status);
    this.localStorage.setItem(this.AUTH_KEY, status.toString());
  }

  updateAvatar(base64Image: string) {
    const current = this.userProfile();
    const updated = { ...current, avatar: base64Image };
    this.updateProfile(updated);
  }

  logout() {
    this.setLoginStatus(false);
    this.updateProfile(this.getDefaultProfile());
  }
}
