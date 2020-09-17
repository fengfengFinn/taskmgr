import { isValidDate } from './../../utils/date.util';
import {
  map,
  filter,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { combineLatest, merge, Subscription } from 'rxjs';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  Component,
  OnInit,
  forwardRef,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
} from '@angular/core';

import {
  isBefore,
  subDays,
  differenceInDays,
  subMonths,
  differenceInMonths,
  differenceInYears,
  format,
  subYears,
  parseISO,
  isDate,
} from 'date-fns';
import { formatDate, DatePipe } from '@angular/common';

export enum AgeUnit {
  Year = 0,
  Month = 1,
  Day = 2,
}

export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  selectedUnit = AgeUnit.Year;
  form: FormGroup;
  ageUnits = [
    { value: AgeUnit.Year, label: 'years old' },
    { value: AgeUnit.Month, label: 'months old' },
    { value: AgeUnit.Day, label: 'days old' },
  ];

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  @Input() format = 'yyyy-MM-dd';
  @Input() locale = 'en-us';

  sub: Subscription;

  private propagateChange = (_: any) => {};

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      birthday: ['', this.validateDate],
      age: this.fb.group(
        {
          ageNum: [],
          ageUnit: [AgeUnit.Year],
        },
        { validators: this.validateAge('ageNum', 'ageUnit') }
      ),
    });

    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.pipe(
      map((d) => {
        return {
          date: formatDate(d, this.format, this.locale),
          from: 'birthday',
        };
      }),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      filter((_) => birthday.valid)
    );
    const ageNum$ = ageNum.valueChanges.pipe(
      startWith(ageNum.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    const ageUnit$ = ageUnit.valueChanges.pipe(
      startWith(ageUnit.value),
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );

    // tslint:disable-next-line: deprecation
    const age$ = combineLatest(ageNum$, ageUnit$).pipe(
      map(([num, unit]) => this.toDate({ age: num, unit })),
      map((d) => {
        return { date: d, from: 'age' };
      }),
      filter((_) => this.form.get('age').valid)
    );

    const merged$ = merge(birthday$, age$).pipe(filter((_) => this.form.valid));

    this.sub = merged$.subscribe((d) => {
      const age = this.toAge(parseISO(d.date));

      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, { emitEvent: false });
        }
        if (age.age !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageUnit.patchValue(age.unit, { emitEvent: false });
        }
        this.propagateChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(parseISO(d.date), { emitEvent: false });
        }
        this.propagateChange(d.date);
      }
    });
  }

  writeValue(obj: any): void {
    if (obj) {
      const date = parseISO(obj);
      this.form.get('birthday').patchValue(date);

      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }

    return {
      ageInvalid: true,
    };
  }

  validateDate(c: FormControl): { [key: string]: any } {
    const val = c.value;

    return isValidDate(val) ? null : { dateOfBirthInvalid: true };
  }

  validateAge(ageNumKey: string, ageUnitKey: string): any {
    return (fg: FormGroup) => {
      const ageNum = fg.controls[ageNumKey];
      const ageUnit = fg.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year:
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        case AgeUnit.Month:
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        case AgeUnit.Day:
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;

        default:
          break;
      }

      return result ? null : { ageInvalid: true };
    };
  }

  toAge(date: Date): Age {
    const now = formatDate(new Date(), this.format, this.locale);

    const nowDate = parseISO(now);
    return isBefore(subDays(nowDate, this.daysTop), date)
      ? { age: differenceInDays(nowDate, date), unit: AgeUnit.Day }
      : isBefore(subMonths(nowDate, this.monthsTop), date)
      ? { age: differenceInMonths(nowDate, date), unit: AgeUnit.Month }
      : { age: differenceInYears(nowDate, date), unit: AgeUnit.Year };
  }

  private toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Day:
        return formatDate(subDays(now, age.age), this.format, this.locale);
      case AgeUnit.Month:
        return formatDate(subMonths(now, age.age), this.format, this.locale);

      case AgeUnit.Year:
        return formatDate(subYears(now, age.age), this.format, this.locale);

      default:
        return null;
    }
  }
}
