import {
  getCitiesByProvince,
  getDistrictsByCity,
  getProvinces,
} from './../../utils/area.util';
import { Address } from './../../domain/user';
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
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, Observable, combineLatest, Subscription, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaListComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  sub: Subscription;

  address: Address = {
    province: '',
    city: '',
    district: '',
    street: '',
  };

  selProvinceSubject = new Subject<string>();
  selCitySubject = new Subject<string>();
  selDistrictSubject = new Subject<string>();
  selStreetSubject = new Subject<string>();

  public get selectedProvince$(): Observable<string> {
    return this.selProvinceSubject.asObservable().pipe(startWith(''));
  }
  public get selectedCity$(): Observable<string> {
    return this.selCitySubject.asObservable().pipe(startWith(''));
  }
  public get selectedDistrict$(): Observable<string> {
    return this.selDistrictSubject.asObservable().pipe(startWith(''));
  }
  public get selectedStreet$(): Observable<string> {
    return this.selStreetSubject.asObservable().pipe(startWith(''));
  }

  provinces$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;

  private propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit(): void {
    const resultAddress$ = combineLatest([
      this.selectedProvince$,
      this.selectedCity$,
      this.selectedDistrict$,
      this.selectedStreet$,
    ]).pipe(
      map(([p, c, d, s]) => ({ province: p, city: c, district: d, street: s }))
    );

    this.sub = resultAddress$.subscribe((v) => {
      this.propagateChange(v);
    });

    this.provinces$ = of(getProvinces());
    this.cities$ = this.selectedProvince$.pipe(
      map((p) => getCitiesByProvince(p))
    );
    this.districts$ = combineLatest([
      this.selectedProvince$,
      this.selectedCity$,
    ]).pipe(map(([p, c]) => getDistrictsByCity(p, c)));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  writeValue(obj: Address): void {
    if (obj) {
      this.address = obj;

      if (this.address.province) {
        this.selProvinceSubject.next(this.address.province);
      }
      if (this.address.city) {
        this.selCitySubject.next(this.address.city);
      }
      if (this.address.district) {
        this.selDistrictSubject.next(this.address.district);
      }
      if (this.address.street) {
        this.selStreetSubject.next(this.address.street);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  onProvinceChange(): void {
    this.selProvinceSubject.next(this.address.province);
  }
  onCityChange(): void {
    this.selCitySubject.next(this.address.city);
  }
  onDistrictChange(): void {
    this.selDistrictSubject.next(this.address.district);
  }
  onStreetChange(): void {
    this.selStreetSubject.next(this.address.street);
  }

  validate(c: FormControl): { [key: string]: any } {
    const val = c.value as Address;
    if (!val) {
      return null;
    }

    if (val.province && val.city && val.district && val.street) {
      return null;
    }

    return { addressInvalid: true };
  }
}
