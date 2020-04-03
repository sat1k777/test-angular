import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { ProductsResolverService } from './products/products-resolver.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductViewComponent } from './products/product-view/product-view.component';
import { CartComponent } from './cart/cart.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ModalBuyComponent } from './shared/components/modal-buy/modal-buy.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ModalGeneralInfoComponent } from './shared/components/modal-general-info/modal-general-info.component';
import { ModalPersonalInformationComponent } from './shared/components/modal-personal-information/modal-personal-information.component';
import { ModalCreditcardInfoComponent } from './shared/components/modal-creditcard-info/modal-creditcard-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    ProductViewComponent,
    CartComponent,
    ProductsListComponent,
    ModalBuyComponent,
    CheckoutComponent,
    ModalGeneralInfoComponent,
    ModalPersonalInformationComponent,
    ModalCreditcardInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    ReactiveFormsModule,
    BarRatingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    CreditCardDirectivesModule
  ],
  providers: [ProductsResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {}
