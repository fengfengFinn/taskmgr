import { AppStoreModule } from './../../reducers/index';
import {
  extractInfo,
  getAddrByCode,
  isValidAddr,
} from './../../utils/identity.util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { isValidDate } from 'src/app/utils/date.util';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  avatarItems: string[] = [];
  form: FormGroup;
  sub: Subscription;

  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder, private store$: Store<fromRoot.State>) {}

  ngOnInit(): void {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.avatarItems = nums.map((d) => `avatars:svg-${d}`);

    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: ['1994-03-18'],
      identity: [],
      address: [],
    });

    const id$ = this.form.get('identity').valueChanges.pipe(
      debounceTime(300),
      filter(() => {
        return this.form.get('identity').valid;
      })
    );

    this.sub = id$.subscribe((id) => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onSubmit({ value, valid }, ev: Event): void {
    ev.preventDefault();

    this.store$.dispatch(
      authActions.Register({
        password: value.password,
        name: value.name,
        email: value.email,
        avatar: value.avatar,
        identity: value.identity,
        address: value.address,
        dateOfBirth: value.dateOfBirth,
      })
    );
  }
}
