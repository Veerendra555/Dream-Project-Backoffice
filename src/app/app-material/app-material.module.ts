import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { constants } from 'buffer';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {  MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
const componentMaterial = [MatCardModule,MatRadioModule,MatExpansionModule,MatSnackBarModule,MatIconModule,MatSelectModule,MatAutocompleteModule,MatInputModule,MatFormFieldModule,MatTabsModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    componentMaterial
 
  ],
  exports: [
    componentMaterial
  ]
})
export class AppMaterialModule { }
