import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GjsComponent } from './gjs/gjs.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:"gjs",component:GjsComponent},
  {path:"home",component:HomeComponent},
  {path:":id",component:GjsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
