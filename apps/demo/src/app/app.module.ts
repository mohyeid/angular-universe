import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { AppUniverseModule, IConfigValue } from 'libs/app-universe';

import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrillingComponent } from './components/drilling/drilling.component';
import { FullComponent } from './components/full/full.component';
import { DataProviderService } from './services/data-provider.service';

const configJson = require('./app-config/config.json');
const config : IConfigValue = {
    json: configJson
};

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'drilling',
    component: DrillingComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: 'full',
    component: FullComponent,
    data: { title: 'Heroes List' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NxModule.forRoot(),
    HttpClientModule,

    MatCardModule,
    FlexLayoutModule,
    AppUniverseModule.fromConfig(config)
  ],
  providers: [
    DataProviderService
  ],
  declarations: [AppComponent, HomeComponent, DrillingComponent, FullComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
