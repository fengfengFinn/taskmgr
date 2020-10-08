import { Project } from './../../domain/project';
import { ProjectService } from './../../services/project.service';
import { listAnimation } from './../../anims/list.anim';
import { slideToRight } from './../../anims/router.anim';
import { InviteComponent } from './../invite/invite.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  HostBinding,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NewProjectComponent } from '../new-project';
import { ConfirmDialogComponent } from 'src/app/shared';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit {
  i = 3;
  projects: Project[] = [];
  @HostBinding('@routeAnim') state;

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private projService$: ProjectService
  ) {}

  ngOnInit(): void {
    this.projService$.get('1').subscribe((projects) => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  openNewProjectDialog(): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { title: 'New Project' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.cd.markForCheck();
    });
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
