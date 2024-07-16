import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { IssueListComponent } from "./components/issue-list/issue-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IssueListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'issue-tracker';
}
