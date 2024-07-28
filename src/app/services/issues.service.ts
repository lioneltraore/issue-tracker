import { Injectable } from '@angular/core';
import { Issue } from '../model/issue';
import { issues as mockIssues } from '../../assets/mock-issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private issues: Issue[] = [...mockIssues];

  constructor() { }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  updateIssue(issue: Issue) {
    console.log('updated issue: ', issue);
    const updatedArray = this.issues.map(item => item.issueNo === issue.issueNo ? ({...issue}) : item);
    this.issues = [...updatedArray];
    console.log('updated array: ', this.issues);
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter(issue =>
        issue.title.indexOf(title) !== -1);
    }
    return [];
  }
}
