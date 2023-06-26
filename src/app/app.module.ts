import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NoteComponent } from './components/note/note.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NoteComponent,
    UserinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
