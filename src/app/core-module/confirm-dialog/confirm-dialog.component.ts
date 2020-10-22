import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "cman-confirm-dialog",
  template: `
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions *ngIf="data.confirm">
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </div>
    <div *ngIf="!data.confirm">
      <button mat-button mat-dialog-close cdkFocusInitial>OK</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
