import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ActivityCreatorComponent } from './components/admin/activityCreator/activityCreator.component';
import { ActivityModificatorComponent } from './components/admin/activityModificator/activityModificator.component';
import { ActivityManagerComponent } from './components/admin/activityManager/activityManager.component';
import { AdminLandpageComponent } from './components/admin/adminLandpage/adminLandpage.component';
import { UserManagerComponent } from './components/admin/userManager/userManager.component';
import { SupportComponent } from './components/user/support/support.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { TaskManagerComponent } from './components/user/taskManager/taskManager.component';
import { AboutUsComponent } from './components/scrap/aboutUs/aboutUs.component';

import { EmailService } from './services/email.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivityCreatorComponent,
    ActivityModificatorComponent,
    ActivityManagerComponent,
    AdminLandpageComponent,
    UserManagerComponent,
    SupportComponent,
    HeaderComponent,
    FooterComponent,
    TaskManagerComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
