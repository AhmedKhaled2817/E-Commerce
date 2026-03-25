import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ProfileService } from '../../Shared/Service/profile.service';
import { UserProfile } from '../../Shared/Models/user-profile';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, MatIconModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private profileService = inject(ProfileService);

  // Use Signal from service
  userProfile = this.profileService.userProfile;

  isEditMode = signal(false);

  // Local edit model
  editModel: UserProfile = { ...(this.userProfile() as UserProfile) };

  toggleEdit() {
    if (this.isEditMode()) {
      // If closing, reset model
      this.editModel = { ...(this.userProfile() as UserProfile) };
    }
    this.isEditMode.set(!this.isEditMode());
  }

  saveProfile() {
    this.profileService.updateProfile(this.editModel);
    this.isEditMode.set(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.profileService.updateAvatar(base64Image);
        this.editModel.avatar = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  profileCards = [
    {
      title: 'profile.cards.orders.title',
      description: 'profile.cards.orders.desc',
      icon: 'package_2',
      link: '/public/orders/my-orders',
    },
    {
      title: 'profile.cards.security.title',
      description: 'profile.cards.security.desc',
      icon: 'shield_person',
      link: '/public/profile/security',
    },
    {
      title: 'profile.cards.addresses.title',
      description: 'profile.cards.addresses.desc',
      icon: 'location_on',
      link: '/public/profile/addresses',
    },
    {
      title: 'profile.cards.payment.title',
      description: 'profile.cards.payment.desc',
      icon: 'credit_card',
      link: '/public/profile/payment',
    },
    {
      title: 'profile.cards.favorites.title',
      description: 'profile.cards.favorites.desc',
      icon: 'favorite',
      link: '/public/favorite',
    },
    {
      title: 'profile.cards.contact.title',
      description: 'profile.cards.contact.desc',
      icon: 'support_agent',
      link: '/public/home', // Placeholder
    },
  ];
}
