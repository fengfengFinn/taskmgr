import { count, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { Project } from '../domain';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config
  ) {}

  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), { headers: this.headers })
      .pipe(map((res) => res as Project));
  }

  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    };

    return this.http
      .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
      .pipe(map((res) => res as Project));
  }

  delete(project: Project): Observable<Project> {
    const delTasks$ = from(project.taskLists ? project.taskLists : []).pipe(
      mergeMap((listId) =>
        this.http.delete(`${this.config.uri}/taskLists/${listId}`)
      ),
      count()
    );

    return delTasks$.pipe(
      switchMap((result) => {
        console.log(result);
        return this.http.delete(
          `${this.config.uri}/${this.domain}/${project.id}`
        );
      }),
      mapTo(project)
    );
  }

  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri, { params: { members_like: userId } }).pipe(
      map((res) => {
        return res as Project[];
      })
    );
  }
}
