import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivityManagerComponent } from './components/admin/activityManager/activityManager.component';
import { LandpageComponent } from './components/admin/landpage/landpage.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { SupportComponent } from './components/user/support/support.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { TaskManagerComponent } from './components/user/taskManager/taskManager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivityManagerComponent,
    LandpageComponent,
    UserManagerComponent,
    SupportComponent,
    HeaderComponent,
    FooterComponent,
    TaskManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
