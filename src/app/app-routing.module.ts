import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { GuardsGuard } from './guards.guard';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'product',
    component:ProductComponent,
    canActivate: [GuardsGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [GuardsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
