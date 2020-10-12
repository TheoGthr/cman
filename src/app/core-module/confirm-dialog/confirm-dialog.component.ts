import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "cman-confirm-dialog",
  template: `
    <div mat-dialog-content>
      {{ message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
