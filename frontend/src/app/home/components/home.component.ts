import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from '../../shared/components/social-media/social-media.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationComponent, SocialMediaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent { }
