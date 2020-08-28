import { listAnimation } from './../../anims/list.anim';
import { slideToRight } from './../../anims/router.anim';
import { InviteComponent } from './../invite/invite.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, HostBinding } from '@angular/core';
import { NewProjectComponent } from '../new-project';
import { ConfirmDialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
})
export class ProjectListComponent implements OnInit {
  i = 3;
  projects = [
    {
      id: 1,
      name: 'Project1',
      desc: 'This is Project1',
      coverImg: 'assets/imgs/login.jpg',
    },
    {
      id: 2,
      name: 'Project2',
      desc: 'This is Project2',
      coverImg: 'assets/imgs/login.jpg',
    },
  ];

  @HostBinding('@routeAnim') state;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { title: 'New Project' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }
  openEditDialog(): void {
    this.dialog.open(NewProjectComponent, { data: { title: 'Edit Project' } });
  }
  openDeleteDialog(project: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Project', content: 'Do you confirm?' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
