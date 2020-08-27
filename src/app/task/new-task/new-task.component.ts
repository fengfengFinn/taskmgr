import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
