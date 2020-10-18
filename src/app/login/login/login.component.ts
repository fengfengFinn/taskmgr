import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QuoteService } from './../../services';
import { Quote } from './../../domain/quote';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as quoteActions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<fromRoot.State>
  ) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        'lisi@qq.com',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['123', Validators.required],
    });
    this.store$.dispatch(quoteActions.Load());
  }

  onSubmit({ value, valid }, ev: Event): void {
    ev.preventDefault();

    this.store$.dispatch(authActions.Login(value));
  }
}
