import { Component, ElementRef, inject } from '@angular/core';
import { TransferService } from '../../services/transfers.service';
import { Transfer } from '../../interfaces/transfer';
import { FormsModule, NgForm } from '@angular/forms';
import { Benificiary } from '../../interfaces/Benificiary';
import { BenificiaryService } from '../../services/benificiary.service';
import { ServeTransferRequest } from '../../interfaces/serveTransferRequest';

@Component({
  selector: 'app-serve-transfer-cash',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './serve-transfer-cash.component.html',
  styleUrl: './serve-transfer-cash.component.css'
})
export class ServeTransferComponent {

  private el: ElementRef = inject(ElementRef);

  private transferService = inject(TransferService);

  private benificiaryService = inject(BenificiaryService);

  transferToServe !: Transfer;

  benificiary !: Benificiary;


  ngOnInit(): void {
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

  checkTransferToServe(reference: NgForm) {

    this.transferService.checkTransferToServe$(reference.value.reference).subscribe(response => {
      if (response) {
        this.transferToServe = response;

      } else {
        alert('Incorrect reference')
      }
    });
  }

  getBeneficiary() {
    this.benificiaryService.getBeneficiary$(this.transferToServe.recipientId).subscribe(response => {
      this.benificiary = response;
    })
  }

  serveTransferCash() {
    console.log(this.benificiary.client.phoneNumber);
    
    const serveTransferRequest: ServeTransferRequest = {
      reference: this.transferToServe.reference as string,
      phone: this.benificiary.client.phoneNumber,
      clientId: this.transferToServe.clientId
    };

    this.transferService.serveTransferCash$(serveTransferRequest).subscribe(response => {
        console.log(response);

    });
  }

}
