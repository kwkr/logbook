import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModuleModule } from './app-material-module/app-material-module.module';
import { CounterComponent } from './counter/counter.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LogHistoryComponent } from './log-history/log-history.component';
import { LogListComponent } from './log-history/log-list/log-list.component';
import { TimePipe } from './core/time.pipe';

@NgModule({
  declarations: [AppComponent, CounterComponent, LogHistoryComponent, LogListComponent, TimePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModuleModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
