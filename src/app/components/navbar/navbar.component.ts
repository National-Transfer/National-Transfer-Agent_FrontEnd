import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faHouse, faLandmark, faMoneyBillTransfer, faRightFromBracket, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { OKTA_AUTH } from '@okta/okta-angular';

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
  oktaAuth = inject(OKTA_AUTH);

  home() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  clients() {
    this.router.navigate(['clients'], { relativeTo: this.route });
  }

  prospects() {
    this.router.navigate(['prospects'], { relativeTo: this.route });
  }

  transfersRecents() {
    this.router.navigate(['transfers-history'], { relativeTo: this.route });
  }

  sendMoney() {
    this.router.navigate(['issue-transfer'], { relativeTo: this.route });
  }

  profile() {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  serveTransferCash(){
    this.router.navigate(['serve-transfer-cash'], { relativeTo: this.route });

  }
  serveTransferWallet(){
    this.router.navigate(['serve-transfer-wallet'], { relativeTo: this.route });

  }
  issueTransferCash(){
    this.router.navigate(['issue-transfer-cash'], { relativeTo: this.route });

  }

  issueTransferWallet(){
    this.router.navigate(['issue-transfer-wallet'], { relativeTo: this.route });

  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}