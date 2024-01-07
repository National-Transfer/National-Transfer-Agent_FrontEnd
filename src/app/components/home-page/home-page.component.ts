import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightArrowLeft, faUsers, faUsersLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  router = inject(Router);
  route = inject(ActivatedRoute)

  faUsersLine=faUsersLine;
  faUsers=faUsers;
  faArrowRightArrowLeft=faArrowRightArrowLeft;

  clients() {
    this.router.navigate(['clients'], { relativeTo: this.route });
  }
  prospects() {
    this.router.navigate(['prospects'], { relativeTo: this.route });
  }
  transfers() {
    this.router.navigate(['transfers-history'], { relativeTo: this.route });
  }
}
