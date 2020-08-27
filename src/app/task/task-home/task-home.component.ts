import { NewTaskComponent } from './../new-task/new-task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CopyTaskComponent } from '../copy-task';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: 'Waiting',
      tasks: [
        {
          id: 1,
          desc:
            'task01 desctask01 desctask01 desctask01 desctask01 desctask01 desctask01 desc',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'zhangsan',
            avatar: 'avatars:svg-1',
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: 'task02 desc',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'zhangsan',
            avatar: 'avatars:svg-1',
          },
          dueDate: new Date(),
        },
        {
          id: 3,
          desc: 'task03 desc',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'lisi',
            avatar: 'avatars:svg-2',
          },
          dueDate: new Date(),
        },
      ],
    },
    {
      id: 2,
      name: 'In progress',
      tasks: [
        {
          id: 4,
          desc: 'task04 desc',
          completed: false,
          priority: 3,
          owner: {
            id: 4,
            name: 'gui4',
            avatar: 'avatars:svg-4',
          },
          dueDate: new Date(),
        },
        {
          id: 7,
          desc: 'task07 desc',
          priority: 1,
          completed: false,
          dueDate: new Date(),
        },
      ],
    },
    {
      id: 3,
      name: 'Finished',
      tasks: [
        {
          id: 5,
          desc: 'task05 desc',
          completed: true,
          priority: 2,
          owner: {
            id: 3,
            name: 'kkk3',
            avatar: 'avatars:svg-3',
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 6,
          desc: 'task06 desc',
          completed: true,
          priority: 1,
          owner: {
            id: 3,
            name: 'kkk3',
            avatar: 'avatars:svg-3',
          },
          dueDate: new Date(),
        },
      ],
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  lanuchNewTaskDialog(): void {
    this.dialog.open(NewTaskComponent);
  }

  lanuchCopyTasksDialog(): void {
    this.dialog.open(CopyTaskComponent, {
      data: { lists: this.lists },
      width: '300px',
    });
  }
}
