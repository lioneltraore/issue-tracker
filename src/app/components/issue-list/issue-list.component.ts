import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../model/issue';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { IssueReportComponent } from '../issue-report/issue-report.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [ClarityModule, CommonModule, IssueReportComponent, ConfirmDialogComponent],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];
  selectedIssue: Issue | null = null;
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

  onConfirm(confirmed: boolean) {
    if(confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getPendingIssues();
    }
    this.selectedIssue = null;
  }

}
