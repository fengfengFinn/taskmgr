import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';

declare module 'rxjs' {
  interface Observable<T> {
    debug: (...any) => Observable<T>;
  }
}

Observable.prototype.debug = function (msg: string) {
  return this.do(
    (next) => {
      if (!environment.production) {
        console.log(msg, next);
      }
    },
    (err) => {
      if (!environment.production) {
        console.log('ERROR>>', msg, err);
      }
    },
    () => {
      if (!environment.production) {
        console.log('Complete - ');
      }
    }
  );
};
