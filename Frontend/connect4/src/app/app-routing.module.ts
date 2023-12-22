import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Connect4LocalComponent } from './components/connect4-local/connect4-local.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'local', component: Connect4LocalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
