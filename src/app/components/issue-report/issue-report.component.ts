import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class IssueReportComponent implements OnInit{

  @Input()
  selectedIssue: Issue | null = null;

  @Output()
  formClose = new EventEmitter();

  suggestions: Issue[]= [];

  issueForm = new FormGroup<IssueForm>({
    issueNo: new FormControl(),
    title: new FormControl('', { nonNullable: true, validators: [Validators.minLength(4), Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    priority: new FormControl('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl('', { nonNullable: true, validators: Validators.required})
  })

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe(title => {
      this.suggestions = this.issueService.getSuggestions(title);
    });

    if(this.selectedIssue) {
      this.fillForm(this.selectedIssue);
    }

    console.log('init issue report');
  }

  save() {
    if(this.selectedIssue) {
      this.updateIssue();
    } else {
      this.addIssue();
    }
  }

  addIssue() {
    if(this.issueForm?.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }

  updateIssue() {
    if(this.issueForm?.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    const updatedIssue: Issue = this.issueForm.getRawValue() as Issue;
    console.log(updatedIssue);
    this.issueService.updateIssue(updatedIssue);
    this.formClose.emit();
  }

  fillForm(selectedIssue: Issue) {
    this.issueForm.get('issueNo')?.setValidators([Validators.required]);
    this.issueForm.patchValue({ ...selectedIssue});
    this.issueForm.get('type')?.disable();
  }

}
