import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: SearchComponent }
  ] },
  { path: '**', redirectTo: '' }
];
