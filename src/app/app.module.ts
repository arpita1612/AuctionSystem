import { BrowserModule, } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './modules/material.module';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { BiddarComponent } from './pages/admin/admin-dashboard/biddar/biddar.component';
import { AuctionerComponent } from './pages/admin/admin-dashboard/auctioner/auctioner.component';
import { AuctionerFrontComponent } from './pages/user/auctioner-front/auctioner-front.component';
import { BiddarFrontComponent } from './pages/user/biddar-front/biddar-front.component';
import { ProductComponent } from './pages/admin/admin-dashboard/product/product.component';
import { SharedProductComponent } from './pages/shared/product/product.component';
import { DialogComponent } from './dialog/dialog.component'
import { BidderDialogComponent } from './pages/shared/bidder-dialog/bidder-dialog.component';
import { ProdDetailDialogComponent } from './pages/shared/prod-detail-dialog/prod-detail-dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { BidlistComponent } from './pages/admin/admin-dashboard/bidlist/bidlist.component';
import { DefaultComponent } from './pages/admin/admin-dashboard/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    BiddarComponent,
    AuctionerFrontComponent,
    BiddarFrontComponent,
    ProductComponent,
    DialogComponent,
    SharedProductComponent,
    AuctionerComponent,
    BidderDialogComponent,
    ProdDetailDialogComponent,
    HomeComponent,
    BidlistComponent,
    DefaultComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CommonModule,
    ChartModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
