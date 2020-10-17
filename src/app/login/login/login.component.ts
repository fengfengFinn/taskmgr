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
import * as actions from '../../actions/quote.action';

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
        'xxx@go.com',
        Validators.compose([
          Validators.required,
          Validators.email,
          this.emailCustomValidate,
        ]),
      ],
      password: ['', Validators.required],
    });
    this.store$.dispatch(actions.Load());
  }

  onSubmit({ value, valid }, ev: Event): void {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  emailCustomValidate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }

    const pattern = /^wang+/;
    if (pattern.test(c.value)) {
      return null;
    }

    return {
      emailNotValid: 'The email must start with wang',
    };
  }
}
