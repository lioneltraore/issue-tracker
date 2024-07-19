import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../model/issue';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { IssueReportComponent } from '../issue-report/issue-report.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [ClarityModule, CommonModule, IssueReportComponent],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  showReportIssue = false;

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.getPendingIssues();
  }

  getPendingIssues() {
    this.issues = this.issuesService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getPendingIssues();
  }

}
