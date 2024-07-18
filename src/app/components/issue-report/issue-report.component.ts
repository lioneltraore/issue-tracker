import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IssueForm } from '../../model/issue-form';

@Component({
  selector: 'app-issue-report',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.css'
})
export class IssueReportComponent {

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true })
  })

}
