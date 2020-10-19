import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
})
export class NewTaskListComponent implements OnInit {
  title = '';
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewTaskListComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      console.log('return....');

      return;
    }

    console.log('done....');
    this.dialogRef.close(value.name);
  }
}
