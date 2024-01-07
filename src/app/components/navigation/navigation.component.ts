import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterPageComponent } from '../footer-page/footer-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavbarComponent, FooterPageComponent, RouterOutlet],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
