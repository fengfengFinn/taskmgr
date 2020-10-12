import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/app/domain';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
})
export class InviteComponent implements OnInit {
  members: User[] = [];

  constructor(
    private dialogrRef: MatDialogRef<InviteComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.members = [...this.data.members];
  }

  onSubmit(form: FormGroup, ev: Event): void {
    ev.preventDefault();
    if (!form.valid) {
      return;
    }

    this.dialogrRef.close(this.members);
  }
}
