import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { CompanyesShowComponent } from './companyes-show/companyes-show.component';

@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    SidebarComponent,
    ToolbarComponent,
    CompanyesShowComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
