import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ClarityModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  @Input()
  issueNo: number | null = null;

  @Output()
  confirm = new EventEmitter<boolean>();

  agree() {
    this.confirm.emit(true);
    this.issueNo = null;
  }

  disagree() {
    this.confirm.emit(false);
    this.issueNo = null;
  }

}
