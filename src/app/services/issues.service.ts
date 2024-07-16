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
}
