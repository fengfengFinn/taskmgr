import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

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
