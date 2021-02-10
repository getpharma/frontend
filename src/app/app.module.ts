import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { AdminService } from './services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoryComponent } from './components/product/create-category/create-category.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { ConfirmationDialogComponent } from './components/product/confirmation-dialog/confirmation-dialog.component';
import { ProductService } from './services/product.service';
import { ProductComponent } from './components/product/product.component';
import { UpdateCategoryComponent } from './components/product/update-category/update-category.component';
import { CreateWholesalerProductComponent } from './components/product/create-wholesaler-product/create-wholesaler-product.component';
import { UpdateWholesalerProductComponent } from './components/product/update-wholesaler-product/update-wholesaler-product.component';
import { WholesalerService } from './services/wholesaler.service';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { CreateRetailerComponent } from './components/user/create-retailer/create-retailer.component';
import { UpdateRetailerComponent } from './components/user/update-retailer/update-retailer.component';
import { CreateWholesalerComponent } from './components/user/create-wholesaler/create-wholesaler.component';
import { UpdateWholesalerComponent } from './components/user/update-wholesaler/update-wholesaler.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/employee/update-employee/update-employee.component';
import { EmployeeService } from './services/employee.service';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './services/order.service';
import { AssignEmployeesComponent } from './components/order/assign-employees/assign-employees.component';
import { PickupComponent } from './components/pickup/pickup.component';
import { PickupService } from './services/pickup.service';
// tslint:disable-next-line:max-line-length
import { ModRateConfirmationDialogComponent } from './components/pickup/mod-rate-confirmation-dialog/mod-rate-confirmation-dialog.component';
import { AssignWholesalerComponent } from './components/pickup/assign-wholesaler/assign-wholesaler.component';
import { WholesalerConfirmationDialogComponent } from './components/pickup/wholesaler-confirmation-dialog/wholesaler-confirmation-dialog.component';
import { AssignPackagerComponent } from './components/pickup/assign-packager/assign-packager.component';
import { CreateStockComponent } from './components/product/create-stock/create-stock.component';
import { UpdateStockComponent } from './components/product/update-stock/update-stock.component';
import { InvoiceComponent } from './components/order/invoice/invoice.component';
import { CancelConfirmationDialogComponent } from './components/order/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { DeletedRetailerComponent } from './components/user/deleted-retailers/deleted-retailer.component';
import { DeletedWholesalerComponent } from './components/user/deleted-wholesalers/deleted-wholesaler.component';
import { ListProductsComponent } from './components/order/list-products/list-products.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ProductComponent,
    CreateCategoryComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ConfirmationDialogComponent,
    UpdateCategoryComponent,
    CreateWholesalerProductComponent,
    UpdateWholesalerProductComponent,
    UserComponent,
    CreateRetailerComponent,
    UpdateRetailerComponent,
    CreateWholesalerComponent,
    UpdateWholesalerComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    OrderComponent,
    AssignEmployeesComponent,
    PickupComponent,
    ModRateConfirmationDialogComponent,
    AssignWholesalerComponent,
    WholesalerConfirmationDialogComponent,
    AssignPackagerComponent,
    CreateStockComponent,
    UpdateStockComponent,
    InvoiceComponent,
    CancelConfirmationDialogComponent,
    DeletedRetailerComponent,
    DeletedWholesalerComponent,
    ListProductsComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  providers   : [
    ApiService,
    AdminService,
    ProductService,
    WholesalerService,
    UserService,
    EmployeeService,
    OrderService,
    PickupService
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
