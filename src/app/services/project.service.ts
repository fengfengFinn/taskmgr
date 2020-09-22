import { map } from 'rxjs/operators';
import { Project } from '../domain';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { JsonFormatter } from 'tslint/lib/formatters';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}
}
