import { CompanyesShowComponent } from './companyes-show/companyes-show.component';
import { AuthenticationGuard } from './../guards/authentication.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: 'Logined' },
      },
      {
        path: 'companies-show',
        component: CompanyesShowComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: 'Logined' },
      },

      // {
      //   path: 'unauthentication',
      //   component: UnAuthenticatedPageComponent,
      // },
      { path: '', redirectTo: 'companies-show', pathMatch: 'full' },
      { path: '**', redirectTo: 'companies-show', pathMatch: 'full' },
      { path: '/', redirectTo: 'companies-show', pathMatch: 'full' },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class BaseRoutingModule { }
