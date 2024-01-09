import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Client } from '../../interfaces/client';
import { Benificiary } from '../../interfaces/Benificiary';
import { ClientResponse } from '../../interfaces/ClientResponse';
import { Transfer } from '../../interfaces/transfer';
import { BenificiaryService } from '../../services/benificiary.service';
import { ClientService } from '../../services/client.service';
import { TransferService } from '../../services/transfers.service';
import { TransferAmountRequest } from '../../interfaces/transferAmountRequest';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { TransferAmountResponse } from '../../interfaces/transferAmountResponse';
import { BehaviorSubject } from 'rxjs';
import { IssueTransferRequest } from '../../interfaces/issueTransferService';
import { ValidateTransferRequest } from '../../interfaces/validateTransferRequest';
import { NgOtpInputModule } from 'ng-otp-input';


interface Claim {
  claim: string;
  value: unknown;
}


@Component({
  selector: 'app-issue-transfer-wallet',
  standalone: true,
  imports: [FormsModule, NgOtpInputModule],
  templateUrl: './issue-transfer-wallet.component.html',
  styleUrl: './issue-transfer-wallet.component.css'
})
export class IssueTransferWalletComponent implements OnInit {

  private clientService: ClientService = inject(ClientService);

  private transferService = inject(TransferService);

  transferAmountResponse  !: TransferAmountResponse;

  benificiairesForClient !: Benificiary[];

  private benificiaryService = inject(BenificiaryService);
  constructor(@Inject(OKTA_AUTH) public oktaAuth: OktaAuth) { }


  transferToServe !: Transfer;

  benificiary !: Benificiary;
  client !: ClientResponse;
  otpMsg !: string;
  claims !: Claim[];
  issuedTransfer !: Transfer;
  transferAmountRequest !: TransferAmountRequest;


  public dataSubject = new BehaviorSubject<Benificiary[]>([]);


  async ngOnInit() {
    const userClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(userClaims).map(entry => ({ claim: entry[0], value: entry[1] }));
    this.setupFormNavigation();
  }

  navigateToFormStep(stepNumber: number): void {
    this.hideAllFormSteps();
    this.markAllFormStepsAsUnfinished();
    this.showCurrentFormStep(stepNumber);
    this.markCurrentFormStepAsActive(stepNumber);

    for (let index = 0; index < stepNumber; index++) {
      this.markFormStepAsCompleted(index);
    }
  }

  private hideAllFormSteps(): void {
    document.querySelectorAll(".form-step").forEach(formStepElement => {
      formStepElement.classList.add("d-none");
    });
  }

  private markAllFormStepsAsUnfinished(): void {
    document.querySelectorAll(".form-stepper-list").forEach(formStepHeader => {
      formStepHeader.classList.add("form-stepper-unfinished");
      formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
  }

  private showCurrentFormStep(stepNumber: number): void {
    const currentFormStep = document.querySelector(`#step-${stepNumber}`);
    if (currentFormStep) {
      currentFormStep.classList.remove("d-none");
    }
  }

  private markCurrentFormStepAsActive(stepNumber: number): void {
    const formStepCircle = document.querySelector(`li[step="${stepNumber}"]`);
    if (formStepCircle) {
      formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
      formStepCircle.classList.add("form-stepper-active");
    }
  }

  private markFormStepAsCompleted(index: number): void {
    const formStepCircle = document.querySelector(`li[step="${index}"]`);
    if (formStepCircle) {
      formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
      formStepCircle.classList.add("form-stepper-completed");
    }
  }

  private setupFormNavigation(): void {
    document.querySelectorAll(".btn-navigate-form-step").forEach(formNavigationBtn => {
      formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number") as string, 10);
        this.navigateToFormStep(stepNumber);
      });
    });
  }


  getClient(client: NgForm) {
    console.log(" cin " +  JSON.stringify(client.value));

    this.clientService.getClientByCin$(client.value.identityNumber).subscribe(response => {
      this.client = response;
    });
  }

  sendTransferAmountRequest(transferAmount: NgForm) {
    console.log(JSON.stringify(transferAmount.value));
    
     this.transferAmountRequest = {
      amount: transferAmount.value.transferAmount,
      clientId: this.client.id as string,
      agentId: this.claims[10].value as string,
      transferNotification: transferAmount.value.transferNotification === '' ? false : true,
      transferType: 'BY_WALLET',
      commissionType: transferAmount.value.commissionType,
      transferReason: transferAmount.value.transferReason
    }
    this.transferService.calculateTransferAmount$(this.transferAmountRequest).subscribe(response => {
      this.transferAmountResponse = response;
    });
  }


  getAllBeneficiariesForClient() {
    this.benificiaryService.getAllBeneficiariesForClient$(this.client.id as string).subscribe(response => {
      this.dataSubject.next(response);
      this.benificiairesForClient = response
    })
    console.log(this.benificiairesForClient);
    
  }

  newBenificiary !: Benificiary;

  addABeneficiary(addForm: NgForm) {
    this.benificiaryService.saveBeneficiaryForClient$(this.client.id as string, addForm.value).subscribe(response => {
      this.dataSubject.next([response, ...this.dataSubject.value]);
      this.newBenificiary = response;
      this.benificiairesForClient = this.dataSubject.value;
    });
  }


  issueTransfer() {
    const issueTransferRequest: IssueTransferRequest = {
      agentId: this.claims[10].value as string,
      phone: this.client.id as string,
      clientId: this.client.id as string,
      amount: +this.transferAmountResponse.totalAmount,
      reason: this.transferAmountRequest.transferReason,
      transferNotification: false,
      recipientId: this.newBenificiary.id as string,
      transferType: 'BY_WALLET',
      commissionType: this.transferAmountRequest.commissionType
    }
    this.transferService.issueTransfer$(issueTransferRequest).subscribe(response => {
        this.issuedTransfer = response;
    });

  }

  validateTransferByWallet(){
    const validateTransferRequest : ValidateTransferRequest ={
      reference: this.issuedTransfer.reference as string,
      otp : this.otpMsg,
      phone : this.newBenificiary.phoneNumber,
      recipientId : this.newBenificiary.id as string
    }

    this.transferService.validateTransferByWallet$(validateTransferRequest).subscribe();
  }


  onOtpChange(data: string) {
    this.otpMsg = data;

  }

  openModal(){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

  
      button.setAttribute('data-bs-target', '#modal');
      console.log("add")
   
    container?.appendChild(button);
    button.click();
  
  }
}
