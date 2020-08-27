import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <div mat-dialog-content>
      {{ content }}
    </div>
    <div mat-dialog-actions>
      <button
        type="button"
        mat-raised-button
        color="primary"
        (click)="onClick(true)"
      >
        OK
      </button>
      <span class="fill-remaining-space"></span>
      <button type="button" mat-button (click)="onClick(false)">Cancel</button>
    </div>
  `,
  styles: [],
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  content = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(result: boolean): void {
    this.dialogRef.close(result);
  }
}
