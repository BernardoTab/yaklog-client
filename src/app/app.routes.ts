import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginRedirectGuard } from './core/guards/login-redirect.guard';
import { ToDoComponent } from './features/tabs/to-do/to-do.component';
import { BacklogComponent } from './features/tabs/backlog/backlog.component';
import { FinishedComponent } from './features/tabs/finished/finished.component';
import { StatsComponent } from './features/tabs/stats/stats.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoginRedirectGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'to-do',
    component: ToDoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'backlog',
    component: BacklogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finished',
    component: FinishedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  },
];
