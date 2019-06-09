import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: CounterComponent }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
