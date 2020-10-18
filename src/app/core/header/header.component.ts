import { Auth } from './../../domain/auth';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  auth$: Observable<Auth>;

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuth);
  }

  ngOnInit(): void {}

  openSidebar(): void {
    this.toggle.emit();
  }

  onChange(checked): void {
    this.toggleDarkTheme.emit(checked);
  }

  logout(): void {
    this.store$.dispatch(authActions.Logout());
  }
}
