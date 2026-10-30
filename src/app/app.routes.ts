
import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { TelephoneList } from './pages/telephone-list/telephone-list';
import { UserList } from './pages/user-list/user-list';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'telephones', component: TelephoneList },
  { path: 'users', component: UserList },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
