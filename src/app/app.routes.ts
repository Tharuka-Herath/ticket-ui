import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {VendorComponent} from './vendor/vendor.component';
import {CustomerComponent} from './customer/customer.component';
import {PurchaseHistoryComponent} from './purchase-history/purchase-history.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vendor', component: VendorComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/purchase-history', component: PurchaseHistoryComponent }
];
