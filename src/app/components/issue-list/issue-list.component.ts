import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../model/issue';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.css'
})
export class IssueListComponent implements OnInit {

  issues: Issue[] = [];

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.getPendingIssues();
  }

  getPendingIssues() {
    this.issues = this.issuesService.getPendingIssues();
  }

}
