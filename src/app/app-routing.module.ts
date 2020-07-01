import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductComponent } from './components/product/product.component';
import { UserComponent } from './components/user/user.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { OrderComponent } from './components/order/order.component';
import { PickupComponent } from './components/pickup/pickup.component';


const routes: Routes = [
  {
    path     : '',
    component: LoginComponent
  },
  {
    path     : 'dashboard',
    component: DashboardComponent
  },
  {
    path     : 'products',
    component: ProductComponent
  },
  {
    path     : 'users',
    component: UserComponent
  },
  {
    path     : 'employees',
    component: EmployeeComponent
  },
  {
    path     : 'orders',
    component: OrderComponent
  },
  {
    path     : 'pickups',
    component: PickupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
