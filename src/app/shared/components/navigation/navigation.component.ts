import { Component } from '@angular/core';
import { AuthService } from '../../../product/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(public authService: AuthService) {}
}
