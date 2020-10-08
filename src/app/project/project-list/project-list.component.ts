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
import { _MAT_INK_BAR_POSITIONER } from '@angular/material/tabs';
import * as _ from 'lodash';
import { filter, switchMap, take } from 'rxjs/operators';

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
    const selectedImg = `/assets/img/covers/${Math.floor(
      Math.random() * 40
    )}_tn.jpg`;

    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), img: selectedImg },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        switchMap((p) => this.projService$.add(p))
      )
      .subscribe((project) => {
        console.log(project);

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

  private getThumbnails(): any {
    return _.range(0, 40).map((i) => `/assets/img/covers/${i}_tn.jpg`);
  }
}
