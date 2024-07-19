import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true })
  })

  constructor(private issueService: IssuesService) {}

  addIssue() {
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

}
