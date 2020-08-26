import { InviteComponent } from './../invite/invite.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NewProjectComponent } from '../new-project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      name: 'Project1',
      desc: 'This is Project1',
      coverImg: 'assets/imgs/login.jpg',
    },
    {
      name: 'Project2',
      desc: 'This is Project2',
      coverImg: 'assets/imgs/login.jpg',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: '{1:"Data From ProjectListWindow"}',
    });

    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }

  openInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }
}
