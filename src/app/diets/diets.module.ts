import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietsComponent } from './diets.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LolaLayoutModule } from '../shared/layout/lola-layout.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { PatientSelectorComponent } from './create/patient-selector/patient-selector.component';
import { FoodSelectorComponent } from './create/food-selector/food-selector.component';
import { FoodSectionSelectorComponent } from './create/food-section-selector/food-section-selector.component';
import { DietsService } from './services/diets.service';
import { DietFirestoreService } from './services/diet.firestore.service';
import { DietsPageStoreService } from './services/diets-page.store.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FoodByTypeSelectorComponent } from './create/food-by-type-selector/food-by-type-selector.component';


const routes = [
  {
    path: '',
    component: DietsComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: ':id/edit',
        component: CreateComponent
      },
      {
        path: ':id',
        component: CreateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [DietsComponent, ListComponent, CreateComponent, PatientSelectorComponent, FoodSelectorComponent, FoodSectionSelectorComponent, FoodByTypeSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    LolaLayoutModule,
  ],
  providers: [
    DietsService,
    DietFirestoreService,
    DietsPageStoreService,
  ]
})
export class DietsModule { }
