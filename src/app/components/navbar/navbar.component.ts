import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faArrowUpWideShort, faCaretDown, faHouse, faLandmark, faMoneyBillTransfer, faNoteSticky, faRightFromBracket, faScroll, faTableList, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  faArrowRightFromBracket= faArrowRightFromBracket;
  faUser=faUser;
  faHouse= faHouse;
  faUserGroup=faUserGroup;
  faRightFromBracket=faRightFromBracket;
  faMoneyBillTransfer = faMoneyBillTransfer
  faLandmark = faLandmark;

  number : number = 0;

  router = inject(Router);
  route = inject(ActivatedRoute);

  home() {
    this.router.navigate(['home'], { relativeTo: this.route });
  }

  clients() {
    this.router.navigate(['clients'], { relativeTo: this.route });
  }

  prospects() {
    this.router.navigate(['prospects'], { relativeTo: this.route });
  }

  transfersRecents() {
    this.router.navigate(['transfer-historique'], { relativeTo: this.route });
  }

  sendMoney() {
    this.router.navigate(['send-money'], { relativeTo: this.route });
  }

  profile() {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }
}
