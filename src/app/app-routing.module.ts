import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services';
// const routes: Routes = [{ path: '', component: AppComponent }];
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'project',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./project').then((m) => m.ProjectModule),
  },
  {
    path: 'tasklists/:id',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./task').then((m) => m.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
