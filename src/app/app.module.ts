import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
