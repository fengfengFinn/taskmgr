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
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as projectActions from '../../actions/project.action';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent implements OnInit, OnDestroy {
  i = 3;
  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;

  @HostBinding('@routeAnim') state;

  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private store$: Store<fromRoot.State>
  ) {
    this.store$.dispatch(projectActions.Load());
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.pipe(map((p) => (p ? p.length : 0)));
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {}

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
        map((val) => ({ ...val, coverImg: this.buildImgSrc(val.coverImg) }))
      )
      .subscribe((project) => {
        this.store$.dispatch(projectActions.Add(project));
      });
  }

  openInviteDialog(project: Project): void {
    const dialogRef = this.dialog.open(InviteComponent, {
      data: { members: project.members },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
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
        }))
      )
      .subscribe((p) => {
        this.store$.dispatch(projectActions.Update(p));
      });
  }
  openDeleteDialog(project: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Project', content: 'Do you confirm?' },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cd.markForCheck();

      this.store$.dispatch(projectActions.Delete(project as Project));
    });
  }

  selectProject(project: Project): void {
    this.store$.dispatch(projectActions.Select(project));
  }

  private getThumbnails(): any {
    return _.range(0, 40).map((i) => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
