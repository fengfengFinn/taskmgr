import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  priorities = [
    { label: 'Emergency', value: 1 },
    { label: 'Important', value: 2 },
    { label: 'Normal', value: 1 },
  ];

  title = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit(): void {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data));
  }
}
