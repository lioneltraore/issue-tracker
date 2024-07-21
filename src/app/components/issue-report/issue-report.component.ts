import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IssueForm } from '../../model/issue-form';
import { ClarityModule } from '@clr/angular';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../model/issue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-report',
  standalone: true,
  imports: [ReactiveFormsModule, ClarityModule, CommonModule],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.css'
})
export class IssueReportComponent {

  @Output()
  formClose = new EventEmitter();

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true, validators: [Validators.minLength(4), Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    priority: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl('', { nonNullable: true, validators: Validators.required})
  })

  constructor(private issueService: IssuesService) {}

  addIssue() {
    if(this.issueForm?.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

}
