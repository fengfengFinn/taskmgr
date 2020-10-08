import { map, switchMap } from 'rxjs/operators';
import { Auth, User } from '../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private token =
    'eyJhbGciOiJIUzIlNiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM6NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
    'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}

  register(user: User): Observable<Auth> {
    user.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { email: user.email } }).pipe(
      switchMap((res) => {
        const users = res as User[];
        if (users && users.length > 0) {
          throw new Error('user exists');
        }
        return this.http
          .post(uri, JSON.stringify(user), { headers: this.headers })
          .pipe(map((u) => ({ token: this.token, user: u as User })));
      })
    );
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { email: username, password } }).pipe(
      map((res) => {
        const users = res as User[];
        if (users.length === 0) {
          throw new Error('username or password not match');
        }
        return {
          token: this.token,
          User: users[0],
        };
      })
    );
  }
}
