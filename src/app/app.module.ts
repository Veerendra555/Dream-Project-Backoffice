import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
// import { Ng2ImgMaxModule } from 'ng2-img-max';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedServiceService} from './shared/service/shared-service.service';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import {CKEditorModule} from 'ngx-ckeditor';
import { AppMaterialModule } from './app-material/app-material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddAdminComponent } from './components/master/admin/add-admin/add-admin.component';
import { ViewAdminComponent } from './components/master/admin/view-admin/view-admin.component';
import { AddCategoriesComponent } from './components/master/categories/add-categories/add-categories.component';
import { ListCategoriesComponent } from './components/master/categories/list-categories/list-categories.component';
import { AddBrandsComponent } from './components/master/brands/add-brands/add-brands.component';
import { ListBrandsComponent } from './components/master/brands/list-brands/list-brands.component';
import { AddProductsComponent } from './components/master/products/add-products/add-products.component';
import { ListProductsComponent } from './components/master/products/list-products/list-products.component';
import { UserDisplayComponent } from './components/master/users/user-display/user-display.component';
import { ViewUsersComponent } from './components/master/users/view-users/view-users.component';
import { PendingOrdersComponent } from './components/orders/pending-orders/pending-orders.component';
import { ConfirmedOrdersComponent } from './components/orders/confirmed-orders/confirmed-orders.component';
import { CompletedOrdersComponent } from './components/orders/completed-orders/completed-orders.component';
import { CancelledOrdersComponent } from './components/orders/cancelled-orders/cancelled-orders.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { MasterDataComponent } from './components/master-data/master-data.component';
import { ContactComponent } from './components/master/contact/contact.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ViewClientComponent } from './components/clients/view-client/view-client.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { ListEventsComponent } from './components/events/list-events/list-events.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    SidemenuComponent,
    AddAdminComponent,
    ViewAdminComponent,
    AddCategoriesComponent,
    ListCategoriesComponent,
    AddBrandsComponent,
    ListBrandsComponent,
    AddProductsComponent,
    ListProductsComponent,
    UserDisplayComponent,
    ViewUsersComponent,
    PendingOrdersComponent,
    ConfirmedOrdersComponent,
    CompletedOrdersComponent,
    CancelledOrdersComponent,
    AccountDetailsComponent,
    MasterDataComponent,
    ContactComponent,
    AddClientComponent,
    ViewClientComponent,
    AddEventComponent,
    ListEventsComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgImageFullscreenViewModule,
    NgxQRCodeModule,
    // Ng2ImgMaxModule,
    BrowserAnimationsModule,
    CKEditorModule,
    AppMaterialModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ChartsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxMaskModule.forRoot({
      showMaskTyped : true,
    }),
  ],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
