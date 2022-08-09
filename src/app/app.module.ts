import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PmApiService } from './pm-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { ShowPatientComponent } from './patient/show-patient/show-patient.component';
import { AddEditPatientComponent } from './patient/add-edit-patient/add-edit-patient.component';

@NgModule({
  declarations: [AppComponent, PatientComponent, ShowPatientComponent, AddEditPatientComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [PmApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
