import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LolaLayoutModule } from './shared/layout/lola-layout.module';
import { CoreModule } from './core/core.module';
import { PatientsCoreModule } from './shared/patients-core/patients-core.module';
import { FoodsCoreModule } from './shared/foods-core/foods-core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    FlexLayoutModule,
    CoreModule,
    LolaLayoutModule,
    PatientsCoreModule,
    FoodsCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
