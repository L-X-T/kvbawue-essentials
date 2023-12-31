import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule],
  declarations: [AppComponent, NavbarComponent, SidebarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
