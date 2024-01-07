import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEye, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { ProspectService } from '../../services/prospect.service';
import { Prospect } from '../../interfaces/prospect';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.css'
})
export class ProspectsComponent {

  private prospectService = inject(ProspectService);

  editProspect !: Prospect;
  deleteProspect !: Prospect;
  approveProspect !: Prospect;
  prospects: Prospect[] = [];

  faEye = faEye;
  faTrash = faTrash;
  faSquareCheck = faSquareCheck;
  
  ngOnInit(): void {
    this.loadProspects();
  }

  private loadProspects() {
    this.prospectService.getAllProspects$.subscribe(
      (prospects) => {
        this.prospects = prospects;
      },
      (error) => console.error('Error fetching prospects:', error)
    );
  }


  add(addForm: NgForm) {
    const newProspect: Prospect = addForm.value;
    this.prospectService.saveProspect$(newProspect).subscribe(
      (prospect) => {
        this.prospects.push(prospect);
        addForm.resetForm();
      },
      (error) => console.error('Error adding prospect:', error)
    );
  }
  
  update(updateForm : NgForm) {
    const updatedProspect: Prospect = updateForm.value;
    this.prospectService.updateProspect$(updatedProspect).subscribe(
      (prospect) => {
        const index = this.prospects.findIndex(c => c.id === prospect.id);
        if (index !== -1) {
          this.prospects[index] = prospect;
        }
      },
      (error) => console.error('Error updating prospect:', error)
    );
  }
  delete(prospect : Prospect) {
    this.prospectService.deleteProspect$(prospect.id!).subscribe(
      () => {
        this.prospects = this.prospects.filter(c => c.id !== prospect.id);
      },
      (error) => console.error('Error deleting prospect:', error)
    );
  }
  approve(prospect: Prospect) {
    this.prospectService.convertToClient$(prospect.id!).subscribe(
      () => {
        this.prospects = this.prospects.filter(c => c.id !== prospect.id);
      },
      (error) => console.error('Error approving prospect:', error)
    );
  }


  onOpenModal(prospect: Prospect, mode: string){

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode === 'approve'){
      this.approveProspect = prospect;
      button.setAttribute('data-bs-target', '#approveModal');
    }
    if(mode === 'view'){
      this.editProspect = prospect;
      button.setAttribute('data-bs-target', '#viewModal');
    }
    if(mode === 'delete'){
      this.deleteProspect = prospect;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
