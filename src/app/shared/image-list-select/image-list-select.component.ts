import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListSelectComponent implements ControlValueAccessor {
  selected: string;
  @Input() title = 'Select:';
  @Input() items: string[] = [];
  @Input() cols = 8;
  @Input() rowHeight = '64px';
  @Input() itemWidth = '80px';
  @Input() useSvgIcon = false;
  // tslint:disable-next-line: no-output-rename
  @Output('itemChange') itemChange = new EventEmitter<string>();

  private propagateChange = (_: any) => {};

  public writeValue(obj: any): void {
    if (obj && obj !== '') {
      this.selected = obj;
    }
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public validate(c: FormControl): any {
    const result = this.selected
      ? null
      : {
          imageListSelect: {
            valid: false,
          },
        };
    console.log(result);

    return result;
  }

  public registerOnTouched(): void {}

  // 列表元素选择发生改变触发
  onChange(i): void {
    this.selected = this.items[i];
    // 更新表单
    this.propagateChange(this.items[i]);
    this.itemChange.emit(this.items[i]);
  }
}
