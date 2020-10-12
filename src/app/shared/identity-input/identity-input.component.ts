import { map } from 'rxjs/operators';
import { Identity, IdentityType } from './../../domain/user';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityInputComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  identityTypes = [
    { value: IdentityType.IdCard, label: 'ID Card' },
    { value: IdentityType.Insurance, label: 'Insurance' },
    { value: IdentityType.Military, label: 'Military' },
    { value: IdentityType.Passport, label: 'Passport' },
    { value: IdentityType.Other, label: 'Other' },
  ];

  identity: Identity = { identityType: null, identityNo: null };

  private idTypeSubject = new Subject<IdentityType>();
  private idNoSubject = new Subject<string>();

  sub: Subscription;

  public get idType$(): Observable<IdentityType> {
    return this.idTypeSubject.asObservable();
  }

  public get idNo$(): Observable<string> {
    return this.idNoSubject.asObservable();
  }

  private propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit(): void {
    const val$ = combineLatest([this.idType$, this.idNo$]).pipe(
      map(([type, no]) => ({ identityType: type, identityNo: no }))
    );

    this.sub = val$.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    if (obj) {
      this.identity = obj as Identity;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  onIdTypeChange(idType: IdentityType): void {
    this.idTypeSubject.next(idType);
  }

  onIdNoChange(idNoStr: string): void {
    this.idNoSubject.next(idNoStr);
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }

    switch (val.identityType) {
      case IdentityType.IdCard:
        return this.validateIdCard(c);
      case IdentityType.Passport:
        return this.validatePassport(c);
      case IdentityType.Military:
        return this.validateMilitary(c);
      case IdentityType.Insurance:
      default:
        return null;
    }
  }

  validateIdCard(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (val.identityNo.length !== 18) {
      return { idInvalid: true };
    }
    return null;
  }
  validatePassport(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (val.length !== 9) {
      return { idInvalid: true };
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }

  validateMilitary(c: FormControl): { [key: string]: any } {
    const val = c.value;
    const pattern = /d{3}$/;
    return pattern.test(val) ? null : { idNotValid: true };
  }
}
