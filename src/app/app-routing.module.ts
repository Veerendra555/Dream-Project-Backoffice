import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './components/auth/admin-profile/admin-profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BannerComponent } from './components/master/banner/banner.component';
import { AddAdminComponent } from './components/master/admin/add-admin/add-admin.component';
import { ViewAdminComponent } from './components/master/admin/view-admin/view-admin.component';
import { AuthServiceService } from './services/auth-service.service';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AddCategoriesComponent } from './components/master/categories/add-categories/add-categories.component';
import { ListCategoriesComponent } from './components/master/categories/list-categories/list-categories.component';
import { AddBrandsComponent } from './components/master/brands/add-brands/add-brands.component';
import { ListBrandsComponent } from './components/master/brands/list-brands/list-brands.component';
import { ListProductsComponent } from './components/master/products/list-products/list-products.component';
import { AddProductsComponent } from './components/master/products/add-products/add-products.component';
import { UserDisplayComponent } from './components/master/users/user-display/user-display.component';
import { ViewUsersComponent } from './components/master/users/view-users/view-users.component';
import { ConfirmedOrdersComponent } from './components/orders/confirmed-orders/confirmed-orders.component';
import { CompletedOrdersComponent } from './components/orders/completed-orders/completed-orders.component';

import { CancelledOrdersComponent } from './components/orders/cancelled-orders/cancelled-orders.component';
import { PendingOrdersComponent } from './components/orders/pending-orders/pending-orders.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { MasterDataComponent } from './components/master-data/master-data.component';
import { ContactComponent } from './components/master/contact/contact.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ViewClientComponent } from './components/clients/view-client/view-client.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { ListEventsComponent } from './components/events/list-events/list-events.component';

const routes: Routes = [
  {
    path: 'auth/login', component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthServiceService],
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthServiceService],
       
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthServiceService],
        pathMatch: 'full'
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
        canActivate: [AuthServiceService]
      },
      {
        path: 'add-categorie',
        component: AddCategoriesComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'view-categorie',
        component: ListCategoriesComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'add-client',
        component: AddClientComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'view-client',
        component: ViewClientComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'add-event',
        component: AddEventComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'list-event',
        component: ListEventsComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'view-banner',
        component: BannerComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'view-brands',
        component: ListBrandsComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'add-brands',
        component: AddBrandsComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'view-products',
        component: ListProductsComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'add-products',
        component: AddProductsComponent,
        canActivate: [AuthServiceService],
      },
	   {
        path: 'view-user',
        component: ViewUsersComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'user',
        component: UserDisplayComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'add-admins',
        component: AddAdminComponent,
        canActivate: [AuthServiceService],
      },
      
      {
        path: 'view-admins',
        component: ViewAdminComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'admin-profile',
        component:  AdminProfileComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'confirmed-orders',
        component:  ConfirmedOrdersComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'completed-orders',
        component:  CompletedOrdersComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'cancelled-orders',
        component:  CancelledOrdersComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'pending-orders',
        component:  PendingOrdersComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'terms-and-conditions',
        component:  MasterDataComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'privacy-policy',
        component:  MasterDataComponent,
        canActivate: [AuthServiceService],
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthServiceService],
      },

    ]
  },
  {
    path:'', redirectTo: '/dashboard',pathMatch:'full'
  },
  { path: '**', redirectTo: '/dashboard' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents=[
  LayoutComponent,LoginComponent,DashboardComponent,
  BannerComponent,AccountDetailsComponent,AdminProfileComponent
]