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
  OnDestroy,
} from '@angular/core';
import { NewProjectComponent } from '../new-project';
import { ConfirmDialogComponent } from 'src/app/shared';
import { _MAT_INK_BAR_POSITIONER } from '@angular/material/tabs';
import * as _ from 'lodash';
import { filter, switchMap, take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit, OnDestroy {
  i = 3;
  projects: Project[] = [];
  subs: Subscription[] = [];
  @HostBinding('@routeAnim') state;

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private projService$: ProjectService
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subs.push(
      this.projService$.get('1').subscribe((projects) => {
        this.projects = projects;
        this.cd.markForCheck();
      })
    );
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
        map((val) => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) })),
        switchMap((p) => this.projService$.add(p))
      )
      .subscribe((project) => {
        console.log(project);
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });
  }

  openInviteDialog(): void {
    this.dialog.open(InviteComponent);
  }
  openEditDialog(project: Project): void {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      data: { thumbnails: this.getThumbnails(), project },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        map((val) => ({
          ...project,
          coverImg: this.buildImgSrc(val.coverImg),
          name: val.name,
          desc: val.desc,
        })),
        switchMap((p) => this.projService$.update(p))
      )
      .subscribe((p) => {
        const index = this.projects.map((pro) => pro.id).indexOf(p.id);
        this.projects = [
          ...this.projects.slice(0, index),
          p,
          ...this.projects.slice(index + 1),
        ];
        this.cd.markForCheck();
      });
  }
  openDeleteDialog(project: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Project', content: 'Do you confirm?' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n),
        switchMap(() => this.projService$.delete(project))
      )
      .subscribe((prj) => {
        this.projects = this.projects.filter((p) => p.id !== prj.id);
        this.cd.markForCheck();
      });
  }

  private getThumbnails(): any {
    return _.range(0, 40).map((i) => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
