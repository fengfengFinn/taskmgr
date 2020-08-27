import { InviteComponent } from './../invite/invite.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NewProjectComponent } from '../new-project';
import { ConfirmDialogComponent } from 'src/app/shared';

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
      data: { title: 'New Project' },
    });

    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }

  openInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }
  openEditDialog(): void {
    this.dialog.open(NewProjectComponent, { data: { title: 'Edit Project' } });
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Project', content: 'Do you confirm?' },
    });
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
