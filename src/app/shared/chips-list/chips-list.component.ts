import { UserService } from './../../services/user.service';
import { Observable } from 'rxjs';
import { User } from './../../domain/user';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {
  @Input() multiple = true;
  @Input() placeholderText = 'Please input email';
  @Input() label = 'Add/Update Msember';

  form: FormGroup;
  members: User[] = [];
  memberResults$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      memberSearch: [''],
    });

    this.memberResults$ = this.form.get('memberSearch').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((s) => s && s.length > 1),
      switchMap((str) => this.service.searchUsers(str))
    );
  }

  private propagateChange = (_: any) => {};

  writeValue(obj: User[]): void {
    if (!obj) {
      this.members = [];
      return;
    }

    if (this.multiple) {
      const userEntities = obj.reduce((x, y) => [...x, y], []);
      if (this.members) {
        const remaining = this.members.filter((item) => !userEntities[item.id]);
        this.members = [...remaining, ...obj];
      }
    } else {
      this.members = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  validate(c: FormControl): { [key: string]: any } {
    return this.members ? null : { chipListInvalid: true };
  }

  removeMember(member: User): void {
    const ids = this.members.map((item) => item.id);
    const index = ids.indexOf(member.id);
    if (this.multiple) {
      this.members = [
        ...this.members.slice(0, index),
        ...this.members.slice(index + 1),
      ];
    } else {
      this.members = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChange(this.members);
  }

  handleMemberSelection(member: User): void {
    if (this.members.map((item) => item.id).indexOf(member.id) !== -1) {
      return;
    }

    this.members = this.multiple ? [...this.members, member] : [member];

    this.form.patchValue({ memberSearch: member.name });
    this.propagateChange(this.members);
  }

  displayUsers(user: User): string {
    return user ? user.name : '';
  }

  public get displayInput(): boolean {
    return this.multiple || this.members.length === 0;
  }
}
