import { TaskList } from './../../domain/task-list';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NewTaskListComponent } from './../new-task-list/new-task-list.component';
import { ConfirmDialogComponent } from 'src/app/shared';
import { NewTaskComponent } from './../new-task/new-task.component';
import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CopyTaskComponent } from '../copy-task';
import { slideToRight } from 'src/app/anims/router.anim';
import * as fromRoot from '../../reducers/index';
import { ActivatedRoute } from '@angular/router';
import { pluck, take, filter } from 'rxjs/operators';
import * as taskListActions from '../../actions/task-list.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;

  constructor(
    private dialog: MatDialog,
    private store$: Store<fromRoot.State>,
    private activeRouter: ActivatedRoute
  ) {
    this.projectId$ = this.activeRouter.paramMap.pipe(pluck('id'));
    this.lists$ = this.store$.select(fromRoot.getTaskLists);
  }

  ngOnInit(): void {}

  handleQuickTask(desc: string, listId: string): void {
    console.log(desc);
    console.log(listId);
  }

  lanuchNewTaskDialog(): void {
    this.dialog.open(NewTaskComponent, { data: { title: 'New Task' } });
  }

  lanuchUpdateTaskDialog(task): void {
    this.dialog.open(NewTaskComponent, {
      data: { title: 'Update Task', task },
    });
  }

  lanuchCopyTasksDialog(): void {
    // this.dialog.open(CopyTaskComponent, {
    //   data: { lists: this.lists$ },
    //   width: '300px',
    // });
  }

  lanuchDeleteTasksDialog(list: TaskList): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete Task', content: 'Do you confirm?' },
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter((n) => n)
      )
      .subscribe((result) => {
        if (result as boolean) {
          this.store$.dispatch(taskListActions.Delete(list));
        }
      });
  }

  lanuchListChangeDialog(list: TaskList): void {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: { title: 'Edit Task List', tasklist: list },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        this.store$.dispatch(
          taskListActions.Update({ ...result, id: list.id })
        );
      });
  }

  openNewTaskListDialog(ev: Event): void {
    const dialogRef = this.dialog.open(NewTaskListComponent, {
      data: { title: 'New Task List' },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        this.store$.dispatch(taskListActions.Add(result));
      });
  }

  handleDrop(): void {
    console.log();
  }
  handleMove(srcData): void {
    switch (srcData.tag) {
      case 'task-item': {
        console.log(srcData.data);
        break;
      }
      case 'task-list': {
        console.log(srcData.data);
        break;
      }
      default:
        break;
    }
  }
}
